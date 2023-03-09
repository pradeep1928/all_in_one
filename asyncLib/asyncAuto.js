
// Database query with async.auto 
const async = require('async')
const mysql = require("mysql2");

// // *** Example - 1
// const connection = mysql.createConnection({
//     host: "10.40.12.189",
//     port: 3306,
//     user: "root",
//     password: "pradeep",
//     database: "async_auto",
// })

// // *** Define a set of tasks with dependencies 
// const tasks = {
//     connect: (callback) => {
//         connection.connect((err) => {
//             if (err) {
//                 callback(err)
//             } else {
//                 console.log('connected to mysql database.')
//                 callback()
//             }
//         })
//     },
//     getUsers: ['connect', (results, callback) => {
//         connection.query('select * from users', (err, rows) => {
//             if (err) {
//                 callback(err)
//             } else {
//                 console.log('Got users: ', rows);
//                 callback(null, rows)
//             }
//         })
//     }],
//     getOrders: ['connect', (results, callback) => {
//         connection.query('select * from orders', (err, rows) => {
//             if (err) {
//                 callback(err)
//             } else {
//                 console.log('Got orders: ', rows);
//                 callback(null, rows)
//             }
//         })
//     }],
//     disconnect: ['getUsers', 'getOrders', (results, callback) => {
//         connection.end((err) => {
//             if (err) {
//                 callback(err)
//             } else {
//                 console.log("Disconnected from mysql database.");
//             }
//         })
//     }]
// }

// // *** Executing above tasks in correct order.

// async.auto(tasks, (err, results) => {
//     if (err) {
//         console.error('Error: ', err);
//     } else {
//         console.log("Results: ", results);
//     }
// })






// *** Example - 2
// Define a set of tasks with their dependencies
const tasks1 = {
    task1: (callback) => {
      console.log('Task 1: Started');
      setTimeout(() => {
        console.log('Task 1: Done');
        callback(null, 'Result 1');
      }, 1000);
    },
    task2: ['task1', (results, callback) => {
      console.log('Task 2: Started');
      console.log('Task 1 Result:', results.task1);
      setTimeout(() => {
        console.log('Task 2: Done');
        callback(null, 'Result 2');
      }, 2000);
    }],
    task3: ['task2', (results, callback) => {
      console.log('Task 3: Started');
      console.log('Task 2 Result:', results.task2);
      setTimeout(() => {
        console.log('Task 3: Done');
        callback(null, 'Result 3');
      }, 3000);
    }]
  };
  
  // Execute the tasks in parallel, based on their dependencies
  async.auto(tasks1, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('All tasks are done:', results);
    }
  });