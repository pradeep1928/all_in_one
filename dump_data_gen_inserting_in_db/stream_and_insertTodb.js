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


async function fileReading() {
    var file_path = `/home/viva/Desktop/pradeep/All_in _one/all_in_one/dump_data_gen_inserting_in_db/upload/add_contacts_new.xlsx`
    const stream = await getXlsxStream({
        filePath: file_path,
        sheet: 0,
    });
    let dataArr = []
    stream.on('data', async (exlrow) => {
        let exlArr = exlrow.raw.arr;
        dataArr.push(exlArr);
    })

    stream.on('end', async () => {
        console.log("in end process ------->");
        let smallArr = []
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
        console.log("end of process ------------> ");
        dataArr = []
        console.log("-----dataArr -----------> ", dataArr.length);
    })
}




fileReading()