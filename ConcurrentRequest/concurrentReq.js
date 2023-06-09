const mysql = require('mysql2');
const { promisify } = require('util');
const cluster = require('cluster');
const moment = require('moment');


// Create a connection pool
const pool = mysql.createPool({
    // connectionLimit: 10,
    host: "10.40.12.164",
    port: 3306,
    user: "root",
    password: "pradeep",
    database: "heloprime_1",
    // connectionLimit: 10000, // Limit the number of connections in the pool
});

    // Promisify the pool query function
    const query = promisify(pool.query).bind(pool);

    // Function to perform a database query
    async function performQuery(queryString) {
        try {
            const results = await query(queryString);
            console.log('Query result:', results.length);
            // console.log('performQuery done');
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }

    let totalRequests = 0; // Variable to store the total number of requests
    let requestsPerSecond = 0; // Variable to store the requests per second

    // Function to execute concurrent requests
    function executeConcurrentRequests() {
        // Number of concurrent requests to send
        const numConcurrentRequests = 10;
        // Array to store all the concurrent requests
        const requests = [];

        // Generate concurrent requests
        for (let i = 0; i < numConcurrentRequests; i++) {
            const queryString = `SELECT * FROM camp_mobile_list_sms_20230608 WHERE camp_id = 1`;
            requests.push(performQuery(queryString));
        }
        totalRequests += numConcurrentRequests; // Increase the total requests by the number of concurrent requests


        // Execute all the concurrent requests
        Promise.all(requests)
            .then(() => {
                console.log(`completed ${requests.length} requests :: timestamp: ${moment().format('YYYY/MM/DD-hh:mm:ss')}`);
                // Perform any cleanup or additional tasks here
                // pool.end(); // Close the connection pool when done
            })
            .catch((error) => {
                console.error('Error executing concurrent requests:', error);
                // Perform error handling or cleanup tasks here if needed
                // pool.end(); // Close the connection pool when done
            });
    }


    let interval = 1000;
    // --> Run the function in an interval of 1 second
    // setInterval(executeConcurrentRequests, interval);
    // executeConcurrentRequests()

    (function recursiveCall() {
        executeConcurrentRequests();
        requestsPerSecond = totalRequests;
        totalRequests = 0;
        console.log(`Requests per second: ${requestsPerSecond} :: timestamp: ${moment().format('YYYY/MM/DD-hh:mm:ss')}`);
        setTimeout(recursiveCall, interval);
      })();


    // --> Calculate requests per second every second
    // setInterval(() => {
    //     requestsPerSecond = totalRequests;
    //     totalRequests = 0;
    //     console.log('Requests per second:', requestsPerSecond);
    // }, interval);
