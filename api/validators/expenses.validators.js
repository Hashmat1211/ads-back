const { isEmpty, isString, isValidDate, isValidObjectId, isNumber } = require('../../utils/custom.validator')
const httpsStatus = require('http-status-codes')

//TODO: date type problem in expense and income validators. needs to be fixed later

const addExpenseValidator = (req, res, next) => {
    try {
        const errors = {};
        const { type, amount, payee, date } = req.body;

        // validation for type in req.body
        if (isEmpty(type)) {
            errors.type = 'type is required.';

        } else if (!isString(type)) {
            errors.type = 'Should be a valid string';
        }

        // validation for payee in req.body
        if (isEmpty(payee)) {
            errors.payee = 'Payee is required.';

        } else if (!isString(payee)) {
            errors.payee = 'Should be a valid string';
        }

        // validation for amount in req.body
        if (isEmpty(amount)) {
            errors.amount = 'amount is required.';

        } else if (!isNumber(amount)) {
            errors.amount = 'Should be a valid Amountin Numbers';
        }

        // validation for date in req.body
        if (isEmpty(date)) {
            errors.date = 'date is required.';

        } else if (!isString(date)) {
            errors.date = 'Should be a valid date';
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

const updateExpenseValidator = (req, res, next) => {
    try {
        const errors = {};

        const { type, amount, payee, date } = req.body;
        const { expenseId } = req.params;

        // validation for id in req.params
        if (!expenseId) {
            errors["expenseId"] = "expense Id is required";
        } else if (expenseId && !isValidObjectId(expenseId)) {
            errors["expenseId"] = "expense Id should be valid object id.";
        }

        if (type && !isString(type)) {
            errors["type"] = "type should be valid string.";
        }
        if (type && !isString(payee)) {
            errors["payee"] = "payee should be valid string.";
        }

        if (amount && !isNumber(amount)) {
            errors["amount"] = "amount should be valid string.";
        }
        if (date && !isString(date)) {
            errors["amount"] = "date should be valid string.";
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

const deleteExpenseValidator = (req, res, next) => {
    try {
        const errors = {};

        const { expenseId } = req.params;

        // validation for id in req.params
        if (!expenseId) {
            errors["expenseId"] = "expense Id is required";
        } else if (expenseId && !isValidObjectId(expenseId)) {
            errors["expenseId"] = "expense Id should be valid object id.";
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

const getExpenseByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { expenseId } = req.params;

        // validation for id in req.params
        if (!expenseId) {
            errors["expenseId"] = "expense Id is required";
        } else if (expenseId && !isValidObjectId(expenseId)) {
            errors["expenseId"] = "expense Id should be valid object id.";
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
    addExpenseValidator,
    updateExpenseValidator,
    getExpenseByIdValidator,
    deleteExpenseValidator
}