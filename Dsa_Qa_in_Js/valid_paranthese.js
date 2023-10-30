/*
The "Valid Parentheses" problem is a common coding interview question. You need to determine if a given string containing just the characters '(', ')', '{', '}', '[' and ']' is valid or not, based on the rules of well-formed parentheses. 
*/

// Solution - 1: Here's a solution in JavaScript using a stack data structure: 
function isValid_1(s) {
    const stack = [];
    const openBrackets = '({[';
    const closeBrackets = ')}]';
    const bracketPairs = {
      ')': '(',
      '}': '{',
      ']': '[',
    };
  
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
  
      if (openBrackets.includes(char)) {
        stack.push(char);
      } else if (closeBrackets.includes(char)) {
        if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
          return false;
        }
      }
    }
  
    return stack.length === 0;
  }
  
  // Example usage:
  const validString = "({fsdfs[]fsdfs})";
  const invalidString = "(sfsf{[sfsfs})";
  console.log(isValid_1(validString));   // Output: true
  console.log(isValid(invalidString)); // Output: false

  


// Solution - 2 for only paranthese no other char 
function isValid(s) {
    let openCount = 0;
    const openBrackets_1 = '({[';
  
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
  
      if (openBrackets_1.includes(char)) {
        openCount++;
      } else {
        openCount--;
        if (openCount < 0) {
          return false; // Too many closing brackets
        }
      }
    }
  
    return openCount === 0;
  }
  
  // Example usage:
  const validString_1 = "({[]})";
  const invalidString_1 = "({[]]})";
  console.log(isValid(validString_1));   // Output: true
  console.log(isValid(invalidString_1)); // Output: false
    