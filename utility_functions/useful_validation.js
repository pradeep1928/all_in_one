const _ = require('underscore');



/**
 * checks if the input value is undefined or null or blank string
 * @param {any} val 
 * @returns true or false
 */
function isUndefinedNull(val) {
    if (val == 0 || val == false)
        return false;
    if (val == undefined || val == null || val == "")
        return true;
    return false;
}



/**
 * checks if the all keys given in keylist are presents in the given object or not
 * @param {object} obj 
 * @param {array} keyList 
 * @returns true or false
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
 * 
 * @param {any} input 
 * @returns input if it is valid or null
 */
const validatePassword = (input) => {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if (input.match(pass_reg)) {
        return input
    } else {
        return null;
    }
}


/**
 * if input is 1, '1', true, 'true' returns true otherwise false
 * @param {string} input 
 * @returns true or false
 */
function getTrueFalseValue(input) {
    if (input == 1 || input == "1" || input == true || input == "true")
        return true;
    else if (input == undefined)
        return false;
    else
        return false;
}
