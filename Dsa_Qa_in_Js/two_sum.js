/*
The "Two Sum" problem is a classic coding interview question. Given an array of numbers and a target number, you need to find two numbers in the array that add up to the target number. 
*/

// Solution - 1 Here's a solution in JavaScript using a hash map (object) to optimize the process: 
function twoSum_1(nums, target) {
    const numIndices = {};
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
  
      if (numIndices[complement] !== undefined) {
        return [numIndices[complement], i];
      }
  
      numIndices[nums[i]] = i;
    }
  
    return null; // If no solution is found
  }
  
  // Example usage:
  const nums_1 = [2, 7, 11, 15, 3, 12, 4, 1, 6];
  const target_1 = 7;
  const result_1 = twoSum_1(nums_1, target_1);
  if (result_1) {
    console.log("Solution - 1: Indices of the two numbers:", result_1);
    console.log("Solution - 1: The two numbers are:", nums_1[result_1[0]], nums_1[result_1[1]]);
  } else {
    console.log("Solution - 1: No solution found.");
  }
  

//   Solution - 2 Here's another approach using nested loops:
function twoSum_2(nums, target) {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
    return null; // If no solution is found
  }
  
  // Example usage:
  const num_2 = [2, 7, 11, 15];
  const target_2 = 9;
  const result_2 = twoSum_2(num_2, target_2);
  if (result_2) {
    console.log("Solution - 2: Indices of the two numbers:", result_2);
    console.log("Solution - 2: The two numbers are:", num_2[result_2[0]], num_2[result_2[1]]);
  } else {
    console.log("Solution - 2: No solution found.");
  }
  


//   If you want to find all possible pairs of numbers in the array that add up to the target
// Solution - 2 
function twoSumPairs(nums, target) {
    const result = [];
    const numIndices = {};
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
  
      if (numIndices[complement] !== undefined) {
        result.push([nums[i], complement]);
      }
  
      numIndices[nums[i]] = i;
    }
  
    return result;
  }
  
  // Example usage:
  const nums_3 = [2, 7, 11, 15, 3, 8];
  const target_3 = 18;
  const pairs = twoSumPairs(nums_3, target_3);
  
  if (pairs.length > 0) {
    console.log("Pairs of numbers that add up to the target_3:");
    for (const pair of pairs) {
      console.log(pair);
    }
  } else {
    console.log("No pairs found.");
  }
  