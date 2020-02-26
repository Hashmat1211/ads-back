const Income = require('../schemas/income');
const httpsStatus = require('http-status-codes');
var ObjectId = require('mongoose').Types.ObjectId;

const addNewIncome = async (incomeObj) => {
    try {
        const income = new Income(incomeObj);
        return await income.save();

    } catch (error) {
        console.log('error in add new income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateIncome = async (id, updateObj) => {
    try {
        return await Income.findByIdAndUpdate({ _id: id }, updateObj, { new: true });
    } catch (error) {
        console.log('error in updating name income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteIncome = async (id) => {
    try {
        return await Income.deleteOne({ _id: id });
    } catch (error) {
        console.log('error in deleting name income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllIncomes = async () => {
    try {
        return await Income.find({}).lean().select(`_id amount developer project client hours startDate endDate`);
    } catch (error) {
        console.log('error in getting all incomes ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeById = async (id) => {
    try {
        return await Income.findOne({ _id: id }).lean().select(`_id amount developer project client hours startDate endDate`);
    } catch (error) {
        console.log('error in getting income by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByProject = async (project) => {
    try {
        return await Income.findOne({ project }).lean().select(`_id amount developer project client hours startDate endDate`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByClient = async (client) => {
    try {
        // return await Income.find({ client }).lean().select(`amount`);
        return await Income.aggregate([{
            $match: { $and: [{ client: client }] },
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }]);
    } catch (error) {
        console.log('error in getting income by client ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByStartDate = async (startDate) => {
    try {
        return await Income.findOne({ startDate }).lean().select(`_id amount developer project client hours startDate endDate`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByEndDate = async (endDate) => {
    try {
        return await Income.findOne({ endDate }).lean().select(`_id amount developer project client hours startDate endDate`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}
const getIncomeByDeveloper = async (developer) => {
    try {
        return await Income.aggregate([{
            $match: { $and: [{ developer: developer }] },
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }]);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByDifferentParameters = async (searchData) => {
    try {
        let conditionObj = {};

        if (searchData.developer) {
            conditionObj['developer'] = new ObjectId(searchData.developer);
        }

        if ('hours' in searchData) {
            conditionObj['hours'] = Number(searchData.hours);
        }

        if ('amount' in searchData) {
            conditionObj['amount'] = Number(searchData.amount);
        }

        if (searchData.project) {
            conditionObj['project'] = new ObjectId(searchData.project);
        }

        if (searchData.client) {
            conditionObj['client'] = new ObjectId(searchData.client);
        }

        if (!searchData.startDate && searchData.endDate) {
            let date = new Date(new Date(searchData.endDate).setHours(00, 00, 00));
            conditionObj['endDate'] = { $lte: date };
        } else if (searchData.startDate && !searchData.endDate) {
            let date = new Date(new Date(searchData.startDate).setHours(00, 00, 00));
            conditionObj['endDate'] = { $gt: date };
        } else if (searchData.endDate && searchData.startDate) {
            let startdate = new Date(new Date(searchData.startDate).setHours(00, 00, 00));
            let endDate = new Date(new Date(searchData.endDate).setHours(00, 00, 00));
            conditionObj['endDate'] = { $lte: endDate, $gt: startdate }
        }

        const result = await Income.find(conditionObj).lean().select(`-__v`);

        return result;

    } catch (error) {
        console.log('error in getting income by searching with different optional parameters ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}



module.exports = {
    addNewIncome,
    updateIncome,
    deleteIncome,
    getAllIncomes,
    getIncomeById,
    getIncomeByClient,
    getIncomeByEndDate,
    getIncomeByProject,
    getIncomeByStartDate,
    getIncomeByDeveloper,
    getIncomeByDifferentParameters
}