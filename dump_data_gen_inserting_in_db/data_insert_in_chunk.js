const { getXlsxStream } = require("xlstream");
const xlsx = require('xlsx');
const mysql = require("mysql2");
const excelToJson = require("convert-excel-to-json");
const Transform = require('stream').Transform

const db_config1 = {
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pradeep",
    database: "helo_prime",
};

let conn_test_1 = mysql.createPool(db_config1);


const insertDataMysql = (data) => {
    return new Promise((resolve, reject) => {
        let query_camp_mobile_list = `insert into camp_mobile_list (mobile, var1, var2) VALUES ? `
        conn_test_1.query(query_camp_mobile_list, [data], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })

    })
}


const XLSX = require('xlsx');
const filePath = '/var/www/html/helo_metal_template/landingpage/upload_files/test_20_data.xlsx';
const worksheetName = 'sheet1'; // Specify the sheet name here

const workbook = XLSX.readFile(filePath);
const worksheet = workbook.Sheets[worksheetName];

let rowIndex = 1; // Assuming the data starts from the second row

async function insertNextChunk() {
    const chunkSize = 1000; // Define your desired chunk size

    const data = [];
    let rowCount = 0;

    while (rowCount < chunkSize && worksheet[`A${rowIndex}`]) {
        const row = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: rowIndex })[0];

        // Perform any necessary data transformation or validation here
        if (row.length) {
            data.push(row);
        }
        rowCount++;
        rowIndex++;
    }
    console.log("🚀 ~ file: data_insert_in_chunk.js:58 ~ insertNextChunk ~ rowIndex:", rowIndex)
    console.log("🚀 ~ file: data_insert_in_chunk.js:58 ~ insertNextChunk ~ rowCount:", rowCount)

    if (data.length > 0) {
        console.log("----------------> ", data);

        //   let res = await insertDataMysql(data)
    } else {
        console.log('Data insertion complete.');
    }
}

insertNextChunk(); // Start the data insertion process
