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


  // console.log(checkValidLen('d34', 2, 5))

  console.log('------', Math.floor(Math.random() * 3))