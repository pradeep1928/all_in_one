// input is from csv cell 
// inpurt format: 'pradeep@gmail.com, admin@gmail.com, user@gmail.com'
/**
 * 
 * @param  {string} input 
 * @returns array of valid email or blank array
 */
const emailValidate = (...input) => {
    let valid_mail_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mailArr = [];
    let inputArr;
    if (!input[0] || input[0] === undefined || input[0] === null) {
        return []
    } else {
        inputArr = input[0].split(", ")
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
