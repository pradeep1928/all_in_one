const mysql = require("mysql2");
const fs = require("fs");

// home
const db_config1 = {
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pradeep1910M",
    database: "vivaconnect",
};

let conn_test_1 = mysql.createPool(db_config1);

const select_data_in_steam = (data) => {
    let query_camp_mobile_list = `select * from vivaconnect.camp_mobile_list;`;
    let insert_query = `insert into camp_mobile_list_dump (mobile, var1, var2) VALUES ?`;
    let dataArr = [];
    const stream = conn_test_1.query(query_camp_mobile_list).stream();
    stream
        .on("data", (rows) => {
            delete rows.id;
            // console.log('------table rows----------> ', rows)
            let row_data = Object.values(rows);
            dataArr.push(row_data);
            if (dataArr.length == 10) {
                console.log('---- dataArr length ----> ', dataArr.length)
                conn_test_1.query(insert_query, [dataArr], (err, result) => {
                    if (err) {
                        console.log("Error in insrting chunk ", err);
                    } else {
                        console.log("Insert result ", result);
                    }
                });
                dataArr = [];
            }
        })
        .on("end", () => {
            if (dataArr.length > 0) {
                console.log('---- dataArr length ----> ', dataArr.length)
                conn_test_1.query(insert_query, [dataArr], (err, result) => {
                    if (err) {
                        console.log("Error in insrting chunk ", err);
                    } else {
                        console.log("Insert result ", result);
                    }
                });
                dataArr = [];
            }
            console.log("end of stream");
        })
        .on("error", (err) => {
            console.log("Error in streaming", err);
        });
};

select_data_in_steam();
