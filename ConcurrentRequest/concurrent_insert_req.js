const mysql = require('mysql2');
const { promisify } = require('util');
const cluster = require('cluster');
const { v4: uuidv4 } = require('uuid');
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
            // console.log('Query result:', results.length);
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
        const numConcurrentRequests = 1000;
        // Array to store all the concurrent requests
        const requests = [];

        // Generate concurrent requests
        for (let i = 0; i < numConcurrentRequests; i++) {
            const queryString = `INSERT INTO heloprime_1.camp_info_test
            (camp_name, user_camp_name, merge_camp, username, password, sms_config, total_uploaded_contacts, unique_contacts_processed, total_contacts, total_blacklist_contacts, message, secondary_message, sender_id, is_unicode, status, camp_type, platform, user_id, rule_id, template_id, user_config_id, ssp_config_id, ssp_custom_param, sms_type, schedule_at, created_at, modified_at, smpp_api_key, dnc_refund, primary_communication, secondary_communicaiton, dlt_template_id, rcs_template_id, is_archived, flash_message, frequency_check, frequency_start_datetime, frequency_end_datetime, mi_template_id, archive_date)
            VALUES('camp_name_${uuidv4()}', 'user_camp_name_${uuidv4()}', 0, 'Helo_Video', '425dbdg5', '', 0, 0, 0, 0, 'Hi, 2323 is your one time password (OTP) for accessing your Experian Credit Report. It is valid till dfghjkl. Please do not share this OTP with anyone.<http://h1o.in/xxxx>', '', 'EXPOPS', 0, 0, 0, 0, 25611, 0, 10019, 5, 0, '', 'TEST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'a0ab90ceffe3cfe4387eea3bcb424ad8', 0, 'SMS', 'RCS', '1107161530112482141', '', 0, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', 20230608);
            `;
            requests.push(performQuery(queryString));
        }
        // console.log('requests array length: ', requests.length);
        totalRequests += numConcurrentRequests; // Increase the total requests by the number of concurrent requests


        // Execute all the concurrent requests
        Promise.all(requests)
            .then(() => {
                console.log(`completed ${requests.length} requests :: timestamp: ${moment().format('YYYY/MM/DD-hh:mm:ss')}`);
                // pool.end(); // Close the connection pool when done
            })
            .catch((error) => {
                console.error('Error executing concurrent requests:', error);
                // pool.end(); // Close the connection pool when done
            });
    }


    let interval = 1 * 1000;
    // Run the function in an interval of 1 second
    // setInterval(executeConcurrentRequests, interval);

    // recursive call of the function
    (function recursiveCall() {
        executeConcurrentRequests();
        requestsPerSecond = totalRequests;
        totalRequests = 0;
        console.log(`Requests per second: ${requestsPerSecond} :: timestamp: ${moment().format('YYYY/MM/DD-hh:mm:ss')}`);
        setTimeout(recursiveCall, interval);
      })();

    // executeConcurrentRequests()
