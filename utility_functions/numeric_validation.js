


/**
 * The function checks if the input is numeric or not.
 * @param input - The input parameter is a value that needs to be checked if it is numeric or not. It
 * can be of any data type, but the function will only return true if it is a number or a string
 * containing only digits.
 * @returns The function `isNumeric` returns a boolean value (`true` or `false`) depending on whether
 * the input is a number or a string containing only numeric characters.
 */
const isNumeric = (input) => {
    const reg = new RegExp('^[0-9]+$')
    if (typeof (input) == 'number') {
        return true;
    }
    if (reg.test(input) == true) {
        return true
    } else {
        return false
    }
}


/**
 * The function checks if a given input is a numeric value within a specified range and returns it as
 * an integer, or returns null if it fails the check.
 * @param input - The input parameter is a value that needs to be checked if it is a numeric value
 * within a certain range defined by the min and max parameters.
 * @param min - The minimum value that the input number should be greater than or equal to in order to
 * pass the check.
 * @param max - The `max` parameter is a number that represents the maximum value that the `input`
 * parameter can have in order for the function to return a valid result. If the `input` parameter is
 * greater than `max`, the function will return `null`.
 * @returns The function `checkMinMaxNumber` returns either an integer (parsed from the `input`
 * parameter) or `null`. The integer is returned if the `input` is numeric and falls within the range
 * specified by the `min` and `max` parameters. If the `input` is not numeric or falls outside of the
 * specified range, `null` is returned.
 */
const checkMinMaxNumber = (input, min, max) => {
    if (isNumeric(input) && input >= min && input <= max) {
        return parseInt(input)
    } else {
        return null
    }
}


/**
 * The function checks if an input is a valid number within a specified length range.
 * @param input - The input parameter is the value that needs to be checked for its length. It is
 * expected to be a number.
 * @param minLen - The minimum length of the input as a string.
 * @param maxLen - The `maxLen` parameter in the `checkValidLen` function is the maximum length allowed
 * for the input value. If the length of the input value exceeds this maximum length, the function will
 * return `null`.
 * @returns either an integer (if the input is a valid number within the specified length range) or
 * null (if the input is not a valid number or is not within the specified length range).
 */
function checkValidLen (input, minLen, maxLen) {
    const reg = new RegExp('^[0-9]+$')
    // let inputLen = Math.ceil(Math.log10(input + 1))
    if (reg.test(input) == true) {
      let inputStr = input.toString();
      if (inputStr.length >= minLen && inputStr.length <= maxLen) {
        return parseInt(inputStr)
      } else {
        return null
      }
    } 
    return null
  }

