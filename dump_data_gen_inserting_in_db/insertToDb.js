const reader = require('xlsx')
const mysql = require("mysql2");
const moment = require('moment');
const MongoClient = require("mongodb").MongoClient;
const generate = require('./demoDump')

// *** mongodb connection ***
const connetDb = async () => {
    const mongoUrl = "mongodb://127.0.0.1/";
    let db = null;
    try {
        db = await MongoClient.connect(mongoUrl);
        console.log("Mongodb connected")
    } catch (error) {
        console.log("error in connections", error)
    }
    return db
}

const insertTomongodb = async (dataM) => {
    const dbInstance = await connetDb();
    const dbCol = dbInstance.db('helo_prime').collection('api_mobile');
    let resutl = await dbCol.insertMany(dataM)
    console.log("mongo insert result: ", resutl)
}

let mongo_data = generate.generateDump()
console.log("mongo_data", mongo_data)
insertTomongodb(mongo_data)


// *** mysql dbconfig ***
const db_config1 = {
    connectionLimit: 10,
    host: "10.40.12.189",
    port: 3306,
    user: "root",
    password: "pradeep",
    database: "helo_prime",
    connectTimeout: 20000,
};

let conn_test_1 = mysql.createPool(db_config1);

// *** mysql insert query function ***
const insertDataMysql = (data) => {
    query_camp_info = `insert into camp_info (id, camp_name, user_camp_name, merge_camp, username, password, sms_config, total_uploaded_contacts, total_contacts, total_blacklist_contacts, message, secondary_message, sender_id, is_unicode, status, camp_type, platform, user_id, rule_id, template_id, user_config_id, ssp_config_id, ssp_custom_param, sms_type, smpp_api_key, dnc_refund, primary_communication, secondary_communicaiton, dlt_template_id, rcs_template_id, is_archived, flash_message) values ?`

    query_api_mobile_list = `insert into api_mobile_list (camp_id, api_id, message_id, destination, psn_json, message, shortcode, status, is_open, failed_reason, delivery_status) values ?`
    
    query_api_info = `insert into api_info (id, camp_id, merchant_name, api_key, sms_config, custom_param_pattern, api_type, row_status, rate_limit, project_owner) values ?`

    conn_test_1.query(query_api_info, [data], (err, result) => {
        if (err) throw err;
        console.log("inserted data: ", result)
    })
}


// *** generating and inserting dump data into database ***
// let api_m_list = generate.generateDump()
// let apiValArr = []
// for (let i = 0; i < api_m_list.length; i++) {
//     let val = Object.values(api_m_list[i])
//     apiValArr.push(val)
// }
// console.log("--------->", apiValArr)
// insertDataMysql(apiValArr)



// *** reading data from xlsx file and inserting data to mysql database *** 
const file = reader.readFileSync('./camp_info.xlsx')
const sheets = file.SheetNames

const readXlFile = () => {
    let rowarr = [];
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        temp.forEach((row) => {
            // row.created_at = moment().utc().format('DD/MM/YYYY-HH:mm:ss')
            // row.modified_at = moment().utc().format('DD/MM/YYYY-HH:mm:ss')
            // row.expired_at = moment().utc().format('DD/MM/YYYY-HH:mm:ss')
            // console.log("row", row)
            let val = Object.values(row)
            // console.log("val", val)
            // rowarr.push(val)
        })
    }
    // console.log("rowarr", rowarr)
    insertDataMysql(rowarr)
}


// readXlFile()



