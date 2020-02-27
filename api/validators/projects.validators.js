const { isEmpty, isString, isValidObjectId } = require('../../utils/custom.validator');
const httpsStatus = require('http-status-codes')

const addProjectValidator = (req, res, next) => {
    try {
        const errors = {};
        console.log('req.body ', JSON.stringify(req.body))
        const { name, details, status, date } = req.body;
        let { amount } = req.body;
        amount = Number(amount)

        // validation for name in req.body
        if (isEmpty(name)) {
            errors.name = 'Name is required.';

        } else if (!isString(name)) {
            errors.name = 'Should be a valid string';
        }

        // validation for status in req.body
        if (isEmpty(status)) {
            errors.status = 'status is required.';

        } else if (!isString(status)) {
            errors.status = 'Should be a valid string';
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

const updateProjectValidator = (req, res, next) => {
    try {
        const errors = {};
        console.log('update project \n ', req.body)

        const { name } = req.body;
        const { projectId } = req.params;

        // validation for id in req.params
        if (!projectId) {
            errors["projectId"] = "project Id is required";
        } else if (projectId && !isValidObjectId(projectId)) {
            errors["projectId"] = "project Id should be valid object id.";
        }
        if (name && !isString(name)) {
            errors.name = 'Should be a valid string';

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

const deleteProjectValidator = (req, res, next) => {
    try {
        const errors = {};

        const { projectId } = req.params;

        // validation for id in req.params
        if (!projectId) {
            errors["projectId"] = "project Id is required";
        } else if (projectId && !isValidObjectId(projectId)) {
            errors["projectId"] = "project Id should be valid object id.";
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

const getProjectByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { projectId } = req.params;

        // validation for id in req.params
        if (!projectId) {
            errors["projectId"] = "project Id is required";
        } else if (projectId && !isValidObjectId(projectId)) {
            errors["projectId"] = "project Id should be valid object id.";
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
    addProjectValidator,
    updateProjectValidator,
    getProjectByIdValidator,
    deleteProjectValidator
}