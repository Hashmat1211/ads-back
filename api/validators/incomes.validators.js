const { isEmpty, isValidDate, isNumber, isValidObjectId } = require('../../utils/custom.validator')
const httpsStatus = require('http-status-codes')

const addIncomeValidator = (req, res, next) => {
    try {
        const errors = {};
        const { developer, amount, client, hours, project, startDate, endDate } = req.body;

        // validation for name in req.body
        if (isEmpty(amount)) {
            errors.amount = 'amount is required.';

        } else if (!isNumber(amount)) {
            errors.amount = 'Should be a valid Number';
        }

        // validation for payee in req.body
        if (isEmpty(hours)) {
            errors.hours = 'hours are required.';

        } else if (!isNumber(hours)) {
            errors.hours = 'Should be a valid Number';
        }


        // validation for date in req.body
        if (isEmpty(startDate)) {
            errors.startDate = 'startDate is required.';

        } else if (!isValidDate(date)) {
            errors.startDate = 'Should be a valid Date';
        }

        // validation for date in req.body
        if (isEmpty(endDate)) {
            errors.endDate = 'endDate is required.';

        } else if (!isValidDate(date)) {
            errors.endDate = 'Should be a valid Date';
        }

        // validation for developer id in req.body
        if (!developer) {
            errors["developer"] = "developer Id is required";
        } else if (developer && !isValidObjectId(developer)) {
            errors["developer"] = "developer Id should be valid object id.";
        }

        // validation for client id in req.body
        if (!client) {
            errors["client"] = "client Id is required";
        } else if (client && !isValidObjectId(client)) {
            errors["client"] = "client Id should be valid object id.";
        }

        // validation for developer id in req.body
        if (!project) {
            errors["project"] = "project Id is required";
        } else if (project && !isValidObjectId(project)) {
            errors["project"] = "project Id should be valid object id.";
        }



        if (Object.keys(errors).length > 0) {
            res.status(httpsStatus.BAD_REQUEST).json({
                error: errors
            })
        } else {
            next();
        }

    } catch (error) {
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const updateIncomeValidator = (req, res, next) => {
    try {
        const errors = {};

        const { developer, amount, client, hours, project, startDate, endDate } = req.body;
        const { incomeId } = req.params;

        // validation for id in req.params

        if (incomeId && !isValidObjectId(incomeId)) {
            errors["incomeId"] = "income Id should be valid object id.";
        } else if (developer && !isValidObjectId(developer)) {
            errors["developer"] = "developer Id should be valid object id.";
        } else if (client && !isValidObjectId(client)) {
            errors["client"] = "client Id should be valid object id.";
        } else if (project && !isValidObjectId(project)) {
            errors["project"] = "project Id should be valid object id.";
        } else if (hours && !isNumber(hours)) {
            errors["hours"] = "hours should be valid number.";
        } else if (amount && !isNumber(amount)) {
            errors["amount"] = "amount should be valid Number.";
        } else if (startDate && !isValidDate(startDate)) {
            errors["startDate"] = "startDate should be valid string.";
        } else if (endDate && !isValidDate(endDate)) {
            errors["endDate"] = "endDate should be valid string.";
        }

        if (Object.keys(errors).length > 0) {
            res.status(httpsStatus.BAD_REQUEST).json({
                errors
            })

        } else {
            next();
        }

    } catch (error) {
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const deleteIncomeValidator = (req, res, next) => {
    try {
        const errors = {};

        const { incomeId } = req.params;

        // validation for id in req.params
        if (!incomeId) {
            errors["incomeId"] = "income Id is required";
        } else if (incomeId && !isValidObjectId(incomeId)) {
            errors["incomeId"] = "income Id should be valid object id.";
        }

        if (Object.keys(errors).length > 0) {
            res.status(httpsStatus.BAD_REQUEST).json({
                error: errors
            })

        } else {
            next();
        }

    } catch (error) {
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const getIncomeByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { incomeId } = req.params;

        // validation for id in req.params
        if (!incomeId) {
            errors["incomeId"] = "income Id is required";
        } else if (incomeId && !isValidObjectId(incomeId)) {
            errors["incomeId"] = "income Id should be valid object id.";
        }

        if (Object.keys(errors).length > 0) {
            res.status(httpsStatus.BAD_REQUEST).json({
                error: errors
            })

        } else {
            next();
        }

    } catch (error) {
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

module.exports = {
    addIncomeValidator,
    updateIncomeValidator,
    getIncomeByIdValidator,
    deleteIncomeValidator
}