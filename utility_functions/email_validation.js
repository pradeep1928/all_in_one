// input is from csv cell 
// inpurt format: 'pradeep@gmail.com, admin@gmail.com, user@gmail.com'

/**
 * The function emailValidate takes in a string of email addresses separated by comma and space and returns an
 * array of valid email addresses.
 * @param input - The input parameter is a rest parameter that allows the function to accept any number
 * of arguments as an array. In this case, it is expected to receive a string of comma-separated email
 * addresses.
 * @returns The function `emailValidate` returns an array of valid email addresses if any are found in
 * the input string, or an empty array if no valid email addresses are found or if the input string is
 * empty or null.
 */
function emailValidate(...input) {
    let valid_mail_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mailArr = [];
    let inputArr;
    if (!input[0] || input[0] === undefined || input[0] === null || typeof input[0] === 'boolean' || typeof input[0] == 'number') {
        return []
    } else {
        inputArr = input[0].split(",")
    }
    for (let i = 0; i < inputArr.length; i++) {
        if (!inputArr[i] || inputArr[i] === '') {
            return []
        } else if (inputArr[i].match(valid_mail_reg)) {
            mailArr.push(inputArr[i])
        }
    }
    if (mailArr.length > 0) {
        return mailArr
    } else {
        return []
    }
}
