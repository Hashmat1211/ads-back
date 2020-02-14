/**
* @description Check if constiable is undefined or not
* @param {*} str
*/
exports.isEmpty = (value) => {
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
exports.isValidString = (str) => {
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
exports.isEmail = (value) => {
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
exports.isArray = (value) => {

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
exports.isValidDate = (d) => {
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
exports.isString = (value) => {
  return typeof value === 'string' || value instanceof String;
};

/**
 * @desc Checks if given value is Decimal Number
 * @param {*} value // Accepts string
 */
exports.isDecimalNumber = (value) => {
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
exports.isNumber = (value) => {
  const number = value;
  const myRegEx = /^(\s*[0-9]+\s*)+$/;
  const isValid = myRegEx.test(number);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
exports.isBoolean = (value) => {
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
exports.isAlphaNumeric = (value) => {
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
exports.validatePhone = (value) => {
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
exports.validateName = (value) => {
  const string = value;
  const myRegEx = /^[A-Za-z0-9-.,&\'_ ]*$/;
  const isValid = myRegEx.test(string);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

exports.isValidObjectId = (id) => {
  if (ObjectID.isValid(id)) {
    if (new ObjectID(id) === id) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
