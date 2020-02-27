const { isEmpty, isString, isValidObjectId, isNumber, isEmail, validatePhone } = require('../../utils/custom.validator')
const httpsStatus = require('http-status-codes')

const addDeveloperValidator = (req, res, next) => {
    try {
        const errors = {};
        console.log(req.body);
        const { name, email, details, contact } = req.body;
        let salary = req.body.salary;
        salary = Number(salary)


        // validation for name in req.body
        if (isEmpty(name)) {
            errors.name = 'Name is required.';

        } else if (!isString(name)) {
            errors.name = 'Should be a valid string';
        }

        // validation for email in req.body
        if (isEmpty(email)) {
            errors.email = 'email is required.';

        } else if (!isEmail(email)) {
            errors.email = 'Should be a valid string';
        }

        // validation for details in req.body
        if (isEmpty(details)) {
            errors.details = 'details is required.';

        } else if (!isString(details)) {
            errors.details = 'Should be a valid string';
        }

        // validation for contact in req.body
        if (isEmpty(contact)) {
            errors.contact = 'contact is required.';

        } else if (!validatePhone(contact)) {
            errors.contact = 'Should be a valid Number';
        }

        // validation for salary in req.body
        if (isEmpty(salary)) {
            errors.salary = 'salary is required.';

        } else if (!isNumber(salary)) {
            errors.salary = 'Should be a valid Number';
        }

        if (Object.keys(errors).length > 0) {
            console.log('errors in validation ', errors)
            res.status(httpsStatus.BAD_REQUEST).json({
                error: errors
            })

        } else {
            next();
        }

    } catch (error) {
        console.log('error in add dev val ', error)
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