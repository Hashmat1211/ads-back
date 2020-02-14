const { isEmpty, isString, isValidObjectId } = require('../../utils/custom.validator')
const httpsStatus = require('http-status-codes')

const addDeveloperValidator = (req, res, next) => {
    try {
        const errors = {};
        const { name } = req.body;

        // validation for name in req.body
        if (isEmpty(name)) {
            errors.name = 'Name is required.';

        } else if (!isString(name)) {
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

const updateDeveloperValidator = (req, res, next) => {
    try {
        const errors = {};

        const { name } = req.body;
        const { developerId } = req.params;

        // validation for id in req.params
        if (!developerId) {
            errors["developerId"] = "developer Id is required";
        } else if (developerId && !isValidObjectId(developerId)) {
            errors["developerId"] = "developer Id should be valid object id.";
        }

        // validation for name in req.body
        if (isEmpty(name)) {
            errors.name = 'Name is required to update.';

        } else if (!isString(name)) {
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

const deleteDeveloperValidator = (req, res, next) => {
    try {
        const errors = {};

        const { developerId } = req.params;

        // validation for id in req.params
        if (!developerId) {
            errors["developerId"] = "developer Id is required";
        } else if (developerId && !isValidObjectId(developerId)) {
            errors["developerId"] = "developer Id should be valid object id.";
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

const getDeveloperByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { developerId } = req.params;

        // validation for id in req.params
        if (!developerId) {
            errors["developerId"] = "developer Id is required";
        } else if (developerId && !isValidObjectId(developerId)) {
            errors["developerId"] = "developer Id should be valid object id.";
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
    addDeveloperValidator,
    updateDeveloperValidator,
    getDeveloperByIdValidator,
    deleteDeveloperValidator
}