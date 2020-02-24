var ObjectId = require('mongoose').Types.ObjectId;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {

    return true

  } else {
    return false
  }
}
const isEmpty = (value) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description Check if String and doesn't contain space and special chracters
 * @param {String} str
 *///TODO: it also checks if name does has a space
const isValidString = (str) => {
  const regExp = /^[a-zA-Z]+$/;
  if (typeof str !== 'string') {
    return false;
  } else if (!str.match(regExp)) {
    return false;
  } else {
    return true;
  }
};


/**
 * @desc Checks for valid email
 * @param {String} value // Accepts string
 */
const isEmail = (value) => {
  const email = value;
  const myRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = myRegEx.test(email);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks for valid array
 * @param {*} value
 */
const isArray = (value) => {

  if (value.constructor === Array) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description Is Valid Date
 * @param {*} d
 */
const isValidDate = (d) => {
  if (d === typeof Date) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description Check if valid string
 * @param {String} value
 */
const isString = (value) => {
  return typeof value === 'string' || value instanceof String;
};

/**
 * @desc Checks if given value is Decimal Number
 * @param {*} value // Accepts string
 */
const isDecimalNumber = (value) => {
  const number = value;
  const myRegEx = /^\d+(\.\d+)?$/;
  const isValid = myRegEx.test(number);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
};

/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
const isBoolean = (value) => {
  if (typeof value === 'boolean') {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks if given value is Aplha Numeric
 * @param {*} value // Accepts string
 */
const isAlphaNumeric = (value) => {
  const string = value;
  const myRegEx = /^[a-z0-9 ]+$/i;
  const isValid = myRegEx.test(string);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param value
 */
const validatePhone = (value) => {
  const string = value;
  const myRegEx = /^[0-9+ ]*$/;
  const isValid = myRegEx.test(string);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param value
 */
const validateName = (value) => {
  const string = value;
  const myRegEx = /^[A-Za-z0-9-.,&\'_ ]*$/;
  const isValid = myRegEx.test(string);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  isAlphaNumeric,
  isValidDate,
  isArray,
  isBoolean,
  isDecimalNumber,
  isNumber,
  isEmail,
  isEmpty,
  isValidObjectId,
  validateName,
  validatePhone,
  isString,
  isValidString
}