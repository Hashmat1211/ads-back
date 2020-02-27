const { isEmpty, isString, validatePhone, isValidObjectId, isEmail } = require('../../utils/custom.validator')
const httpsStatus = require('http-status-codes')

const addClientValidator = (req, res, next) => {
    try {
        const errors = {};
        console.log('req.body ', JSON.stringify(req.body))
        const { name, contact, email, details } = req.body;

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

const updateClientValidator = (req, res, next) => {
    try {
        const errors = {};

        const { name, contact } = req.body;
        const { clientId } = req.params;

        // validation for id in req.params
        if (!clientId) {
            errors["clientId"] = "client Id is required";
        } else if (clientId && !isValidObjectId(clientId)) {
            errors["clientId"] = "client Id should be valid object id.";
        }

        if (name && !isString(name)) {
            errors["name"] = "name should be valid string.";
        }

        if (contact && !validatePhone(contact)) {
            errors["contact"] = "contact should be valid string.";
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

const deleteClientValidator = (req, res, next) => {
    try {
        const errors = {};

        const { clientId } = req.params;

        // validation for id in req.params
        if (!clientId) {
            errors["clientId"] = "client Id is required";
        } else if (clientId && !isValidObjectId(clientId)) {
            errors["clientId"] = "client Id should be valid object id.";
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

const getClientByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { clientId } = req.params;

        // validation for id in req.params
        if (!clientId) {
            errors["clientId"] = "client Id is required";
        } else if (clientId && !isValidObjectId(clientId)) {
            errors["clientId"] = "client Id should be valid object id.";
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
    addClientValidator,
    updateClientValidator,
    getClientByIdValidator,
    deleteClientValidator
}