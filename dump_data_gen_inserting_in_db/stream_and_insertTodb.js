const { getXlsxStream } = require("xlstream");
const xlsx = require('xlsx');
const mysql = require("mysql2");
const excelToJson = require("convert-excel-to-json");
const fs = require('fs');
const csv = require('csv-parser');
const Transform = require('stream').Transform

// const db_config1 = {
//     connectionLimit: 10,
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "pradeep",
//     database: "helo_prime",
// };

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

function validate_num(numbers, arr) {
    var regexp_digits = /^[0-9]{10}$/g;
    numbers[0] = numbers[0].replace(/[\x00-\x1F\x80-\xFF]/g, "");
    numbers[0] = numbers[0].slice(-10);
    if (numbers[0] && !isNaN(numbers[0]) && numbers[0].length > 10) {
        arr.push(numbers.slice(-10));
    } else if (numbers[0] && numbers[0].length == 10) {
        if (numbers[0].match(regexp_digits)) {
            arr.push(numbers);
        }
    }/*else{
            console.log('numbers missed : ', numbers[i]);
        }*/
    __logger.debug('Total filtered numbers : ', filtered_numbers.length);
    return filtered_numbers;
}


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
            } else {
                resolve(result)
            }
        })

    })
}

async function xlsx_fileReading() {
    // let file_path = `/var/www/html/helo_metal_template/landingpage/upload_files/add_cantacts1.xlsx`;
    let file_path = `./upload/test_50.xlsx`

    const stream = await getXlsxStream({
        filePath: file_path,
        sheet: 0,
    });
    let flag = false;
    let dataArr = []
    let chunk_index = 0;
    let last_chunk_index = 0
    stream.on('data', async (exlrow) => {
        try {
            let exlArr = exlrow.raw.arr;
            if (flag) {
                console.log('======================> ', typeof exlArr[0])
                var regexp_digits = /^[0-9]{10}$/g;
                exlArr[0] = exlArr[0].toString().replace(/[\x00-\x1F\x80-\xFF]/g, "");
                exlArr[0] = exlArr[0].slice(-10);
                if (exlArr[0] && !isNaN(exlArr[0]) && exlArr[0].length > 10) {
                    dataArr.push(exlArr.slice(-10));
                } else if (exlArr[0] && exlArr[0].length == 10) {
                    if (exlArr[0].match(regexp_digits)) {
                        dataArr.push(exlArr);
                    }
                }

                // dataArr.push(exlArr);
                if (dataArr.length == 1000) {
                    if (parseInt(chunk_index) >= parseInt(last_chunk_index)) {
                        stream.pause()
                        console.log("🚀 ~ file: stream_and_insertTodb.js:52 ~ stream.on ~ dataArr.length:", dataArr.length)
                        let res = await insertDataMysql(dataArr)
                        console.log("🚀 ~ file: stream_and_insertTodb.js:53 ~ stream.on ~ res:", res.info)
                    } else {
                        console.log('--------skip chunk index----------> ', chunk_index)
                    }
                    chunk_index++
                    dataArr = []
                    stream.resume()


                }
            } else {
                headerArr = exlArr;
                flag = true;
            }

        } catch (error) {
            console.log('error in streaming: ', error)
        }
    })
    stream.on('end', async () => {
        console.log("in end process ------->");
        if (dataArr.length) {
            if (parseInt(chunk_index) >= parseInt(last_chunk_index)) {
                console.log("🚀 ~ file: stream_and_insertTodb.js:52 ~ stream.on ~ dataArr.length:", dataArr.length)
                let res = await insertDataMysql(dataArr)
                console.log("🚀 ~ file: stream_and_insertTodb.js:53 ~ stream.on ~ res:", res.info)
            } else {
                console.log('--------skip chunk index----------> ', chunk_index)
            }
        }
        console.log("end of process ------------> ");
    })
}


// xlsx_fileReading()

/**
 * This function reads data from an Excel file, processes it in batches of 1000 rows, and inserts it
 * into a MySQL database.
 */
async function xlsx_fileReading_1() {
    let file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/add_contacts_new.xlsx`
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


// xlsx_fileReading_1()





/**
 * This function reads data from an Excel file and converts it into a JSON object using the xlsx
 * library in JavaScript.
 */
function xlsx_fileReading_2() {
    let file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/BILLING_STATEMENT_LIST_25-APR-2023.xls`
    const workbook = xlsx.readFile(file_path);
    let workbook_sheet = workbook.SheetNames;
    let workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);
    console.log("🚀 ~ file: stream_and_insertTodb.js:89 ~ xlsx_fileReading_2 ~ workbook_response:", workbook_response)
}

// xlsx_fileReading_2()


async function xlsx_fileReading_3() {
    let file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/BILLING_STATEMENT_LIST_25-APR-2023_new.xls`
    const workbook = xlsx.readFile(file_path);
    let workbook_sheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = xlsx.utils.decode_range(workbook_sheet['!ref']);
    range.s.r = 1;
    // range.e.r = range.e.r - 1;
    let workbook_response = xlsx.utils.sheet_to_json(workbook_sheet, { range });
    console.log("🚀 ~ file: stream_and_insertTodb.js:89 ~ xlsx_fileReading_2 ~ workbook_response:", workbook_response)

}

// xlsx_fileReading_3();


/**
 * This function reads data from an Excel file and converts it to JSON format using the excelToJson
 * library.
 */
async function xlsx_fileReading_4() {
    let file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/BILLING_STATEMENT_LIST_25-APR-2023_new.xls`
    const excelData = excelToJson({
        sourceFile: file_path,
        // sheets: [{
        //    name: 'Sheet1',
        //     header:{
        //         rows: 1
        //     },    
        //     columnToKey: {
        //         '*': '{{columnHeader}}'
        //     }
        // }]
        header: {
            rows: 2
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        },
    });

    let result = excelData
    let final_values = Object.values(result)
    console.log("🚀 ~ file: stream_and_insertTodb.js:170 ~ xlsx_fileReading_4 ~ values:", ...final_values)
}

// xlsx_fileReading_4()



async function csv_reader() {
    // let filePath = `/var/www/html/helo_metal_template/landingpage/upload_files/demo.csv`;
    let filePath = `./upload/demo.csv`

    let flag = false
    let dataArr = []
    const csvStream = csv({
        headers: true,
        ignoreEmpty: this
    })

    const stream = fs.createReadStream(filePath)
        .pipe(csvStream)
        .on('data', async (csvRow) => {
            const csvArray = Object.values(csvRow)
            console.log("🚀 ~ file: stream_and_insertTodb.js:221 ~ .on ~ csvArray:", csvArray)

            let a = {};
            if (flag) {
                if (csvArray.length > 0) {
                    var regexp_digits = /^[0-9]{10}$/g;
                    let all_same_regex = /^0{10}$/;
                    csvArray[0] = csvArray[0].replace(/[\x00-\x1F\x80-\xFF]/g, "");
                    csvArray[0] = csvArray[0].slice(-10);
                    if (csvArray[0] && !isNaN(csvArray[0]) && csvArray[0].length > 10 && !all_same_regex.test(csvArray[0])) {
                        dataArr.push(csvArray.slice(-10));
                    } else if (csvArray[0] && csvArray[0].length == 10 && !all_same_regex.test(csvArray[0])) {
                        if (csvArray[0].match(regexp_digits)) {
                            dataArr.push(csvArray);
                        }
                    }

                    // csvArray.forEach(function (item, index) {
                    //     let objKey = headerArray[index];
                    //     a[objKey] = item;
                    // });
                }
                if (dataArr.length == 10) {
                    let res = await insertDataMysql(dataArr)
                    console.log("🚀 ~ file: stream_and_insertTodb.js:53 ~ stream.on ~ res:", res.info)

                }
            } else {
                headerArray = csvArray;
                flag = true;
            }

            // console.log("🚀 ~ file: stream_and_insertTodb.js:228 ~ .on ~ a:", a)

        })
        .on('end', () => {
            console.log('----- in the end process ---------')
        })
}


csv_reader()