const _ = require('underscore');



/**
 * The function checks if a value is undefined, null, or an empty string.
 * @param val - The parameter `val` is a variable that can hold any value, and the function
 * `isUndefinedNull` checks whether the value is undefined, null, or an empty string.
 * @returns The function is checking if the input value is undefined, null, or an empty string. If it
 * is any of those, it returns true. If it is not any of those, it returns false.
 */
function isUndefinedNull(val) {
    if (val == 0 || val == false)
        return false;
    if (val == undefined || val == null || val == "")
        return true;
    return false;
}



/**
 * The function checks if any keys in a given list are missing from a given object.
 * @param obj - The object that needs to be checked for missing keys.
 * @param keyList - The `keyList` parameter is an array of keys that are expected to be present in the
 * `obj` object. The function checks if any of these keys are missing from the object and returns
 * `true` if any key is missing, otherwise it returns `false`.
 * @returns a boolean value - `true` if there are missing keys in the object and `false` if all the
 * keys in the `keyList` are present in the object.
 */
function findMissingKeyInObject(obj, keyList) {
    var missingKeys = [];
    if (keyList && keyList.length > 0) {
        _.each(keyList, function (key) {
            if (obj[key] === null)
                missingKeys.push(key);
        });
    }
    if (missingKeys.length === 0)
        return false;
    else
        return true;
}



/**
 * The function checks if any keys in a given list are null in a given object, including nested
 * objects.
 * @param obj - The object to check for null values in its properties.
 * @param keyList - An array of keys that we want to check for null values in the given object.
 * @returns a boolean value - `true` if any of the keys in the `keyList` are missing or have a value of
 * `null` in the `obj`, and `false` otherwise.
 */
function isKeyInObjectNull(obj, keyList) {
    let missingKeys = [];
    if (keyList && keyList.length > 0) {
        _.each(keyList, function (key) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
                _.each(keyList, function (insideKey) {
                    if (obj[key][insideKey] === null) {
                        missingKeys.push(insideKey)
                    }
                })
            }
            if (obj[key] === null)
                missingKeys.push(key);
        });
    }
    if (missingKeys.length === 0)
        return false;
    else
        return true;
}


/**
 * The function validates a password input based on specific criteria and returns the input if it meets
 * the criteria, otherwise it returns null.
 * @param input - The input parameter is a string that represents a password that needs to be
 * validated.
 * @returns If the input is not a string or is an empty string, null is returned. If the input is a
 * string that contains at least one uppercase letter and one digit, and is between 3 and 20 characters
 * long, the input string is returned. Otherwise, null is returned.
 */
function validatePassword(input) {
    let regex_1 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,20}$/
    let regex_3 = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{3,20}$/
    if (!input || typeof input == 'number' || input === undefined || input === null || typeof input === 'boolean') {
        return null
    }
    if (input.match(regex_3)) {
        return input
    } else {
        return null;
    }
}


/**
 * The function validates a user input string based on a specific regular expression pattern and
 * returns the input if it matches, otherwise it returns null.
 * @param input - The input parameter is a value that needs to be validated according to the specified
 * regex pattern. It can be a string containing alphanumeric characters, dots, and underscores, with a
 * length between 5 and 20 characters. The string should not start or end with a dot or underscore, and
 * should not contain
 * @returns The function `userValidation` returns either the validated input string or `null`.
 */
const userValidation = (input) => {
    // let regex = /^[a-zA-Z0-9]+_[a-zA-Z0-9]{5,20}$/
    let regex = /^(?=[a-zA-Z0-9._]{5,20}$)(?![0-9]*$)(?!.*[_.]{2})[^_.].*[^_.]$/
    if (!input || typeof input == 'number' ||  input === undefined || input === null || typeof input === 'boolean') {
        return null
    }
    if (input.match(regex)) {
        return input
    } else {
        return null;
    }
  }


/**
 * The function only allows alphabetical strings between 2 and 30 characters long and returns null for
 * non-alphabetical inputs.
 * @param input - The input parameter is a string that is checked for containing only alphabetical
 * characters and having a length between 2 and 30 characters. If the input is not a string or does not
 * meet the length and alphabetical character requirements, the function returns null.
 * @returns The function `onlyAlphabetical` returns either the input string if it contains only
 * alphabetical characters and is between 2 and 30 characters long, or `null` if the input is not a
 * string or contains non-alphabetical characters.
 */
  const onlyAlphabetical = (input) => {
    let regex = /^[A-Za-z]{2,30}$/
    if (!input || typeof input == 'number' || input === undefined || input === null || typeof input === 'boolean') {
      return null
    }
    if (input.match(regex)) {
      return input
    } else {
      return null
    }
  }



/**
 * The function returns true if the input is equal to 1, "1", true, or "true", and false if the input
 * is undefined or anything else.
 * @param input - The input parameter is a value that needs to be evaluated as either true or false. It
 * can be of any data type, but the function checks for specific values that would result in a true or
 * false output.
 * @returns If the input is equal to 1, "1", true, or "true", the function will return true. If the
 * input is undefined, the function will return false. Otherwise, the function will also return false.
 */
function getTrueFalseValue(input) {
    if (input == 1 || input == "1" || input == true || input == "true")
        return true;
    else if (input == undefined)
        return false;
    else
        return false;
}



/**
 * The function checks if an object is empty by checking for null, undefined, empty string, empty
 * array, and empty object.
 * @param obj - The object that needs to be checked for emptiness.
 * @returns a boolean value indicating whether the input object is empty or not. If the object is
 * empty, the function returns true, otherwise it returns false.
 */
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == 0 || obj == false)
        return false;

    if (obj == undefined || obj == null || obj == "")
        return true;

    if (typeof obj == "number" || typeof obj == "string" || typeof obj == "boolean")
        return false;
    // Assume if it has a length property with a non-zero value
    // that property is correct.
    if (obj.length > 0)
        return false;
    if (obj.length <= 0)
        return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}



/**
 * The function checks if an input is a proper value by verifying if it is a string and if it exists in
 * a given array.
 * @param input - The input parameter is a value that needs to be checked if it is a proper value or
 * not.
 * @param arr - The `arr` parameter is an array of strings that the `input` parameter will be checked
 * against.
 * @returns either the lowercase version of the input if it is included in the array, or null if the
 * input is not a string or is not included in the array.
 */
function isProperValue(input, arr) {
    if (!input || typeof input === 'number' || input === undefined || input === null || typeof input === 'boolean') {
        return null
    }
    if (arr.includes(input.toLowerCase())) {
        return input.toLowerCase()
    } else {
        return null
    }
}
