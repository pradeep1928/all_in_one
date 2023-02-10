


/**
 * if type of input is number returns true
 * if type of input is string but all are numeric values then also return true
 * @param {string or number} input 
 * @returns true or false
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
 * 
 * @param {string or number} input 
 * @param {number} min 
 * @param {number} max 
 * @returns validate number or null
 */
const checkMinMaxNumber = (input, min, max) => {
    if (isNumeric(input) && input >= min && input <= max) {
        return parseInt(input)
    } else {
        return null
    }
}
