const { isEmpty, isString, isValidObjectId, isNumber } = require('../../utils/custom.validator');
const httpsStatus = require('http-status-codes')

const addProjectValidator = (req, res, next) => {
    try {
        const errors = {};
        console.log('date \n')
        console.log(req.body.date)
        const { name } = req.body;


        // validation for name in req.body
        if (isEmpty(name)) {
            errors.name = 'Name is required.';

        } else if (!isString(name)) {
            errors.name = 'Should be a valid string';
        }



        if (Object.keys(errors).length > 0) {
            console.log(errors)
            res.status(httpsStatus.BAD_REQUEST).json({
                error: errors
            })

        } else {
            next();
        }

    } catch (error) {
        console.log('error in project validator ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const updateProjectValidator = (req, res, next) => {
    try {
        const errors = {};
        //TODO: other fields if exist then check

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
            console.log('err in validations ', errors)
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