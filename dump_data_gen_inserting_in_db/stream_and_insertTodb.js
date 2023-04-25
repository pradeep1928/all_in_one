const { getXlsxStream } = require("xlstream");
const mysql = require("mysql2");

const db_config1 = {
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pradeep",
    database: "helo_prime",
};

let conn_test_1 = mysql.createPool(db_config1);


/**
 * The function inserts data into a MySQL database table called "camp_mobile_list".
 * @param data - The `data` parameter is an array of arrays, where each inner array represents a row of
 * data to be inserted into the `camp_mobile_list` table. The inner arrays should contain values for
 * the `mobile`, `var1`, and `var2` columns in that order.
 * @returns The function `insertDataMysql` is returning a Promise object.
 */
const insertDataMysql = (data) => {
    return new Promise((resolve, reject) => {
        let query_camp_mobile_list = `insert into camp_mobile_list (mobile, var1, var2) VALUES ? `
        conn_test_1.query(query_camp_mobile_list, [data], (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })

    })
}


/**
 * This function reads data from an Excel file, processes it in batches of 1000 rows, and inserts it
 * into a MySQL database.
 */
async function xlsx_fileReading_1() {
    var file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/add_contacts_new.xlsx`
    const stream = await getXlsxStream({
        filePath: file_path,
        sheet: 0,
    });
    let dataArr = []
    stream.on('data', async (exlrow) => {
        let exlArr = exlrow.raw.arr;
        console.log("🚀 ~ file: stream_and_insertTodb.js:39 ~ stream.on ~ exlArr:", exlArr)
        dataArr.push(exlArr);
    })

    stream.on('end', async () => {
        console.log("in end process ------->");
        let smallArr = []
        if (dataArr.length) {
            for (let i = 1; i < dataArr.length; i++) {
                smallArr.push(dataArr[i])
                if (smallArr.length == 1000) {
                    console.log("🚀 ~ file: test.js:49 ~ stream.on ~ smallArr:", smallArr.length)
                    let res = await insertDataMysql(smallArr)
                    console.log("🚀 ~ file: test.js:41 ~ stream.on ~ res:", res)
                    smallArr = []
                }
        
            }
            if (smallArr.length > 0) {
                let res = await insertDataMysql(smallArr)
                console.log("🚀 ~ file: test.js:58 ~ stream.on ~ res:", res)
            }    
        }
        console.log("end of process ------------> ");
        dataArr = []
        console.log("-----dataArr -----------> ", dataArr.length);
    })
}


xlsx_fileReading_1()