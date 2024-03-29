const { parse } = require("json2csv");
const xlsx = require('xlsx')
const fs = require('fs');
const csv = require('csv-parser');
const randomstring = require('randomstring');


//Function to generate a random email address
function generateRandomEmail() {
  const username = randomstring.generate({
    length: 8,
    charset: 'alphabetic'
  });
  const domain = randomstring.generate({
    length: 4,
    charset: 'alphabetic'
  });
  return `${username}@gmail.com`;
}

function randStr(length) {
    let strresult = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        strresult += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return strresult;
}

const randNum = (num) => {
    let numresult = Math.floor(Math.random() * num)
    return numresult
}

const new_randNum = (num) => {
    let numresult = Math.floor(Math.random() * num)
    if (numresult.toString().length == 10) {
        return numresult.toString()
    } else if (numresult.toString().length < 10) {
        return '1234567899'
    }
}


console.log(randStr(15));
console.log(new_randNum(9999999999));

const generateDump = () => {
    let demoArr = []
    let demoMysqlArr = [];
    let demoMongoArr = [];

    for (let i = 0; i < 10000; i++) {
        // let number = new_randNum(9999999999)
        // number = number.toString()
        // fs.appendFileSync('./upload/test.txt', `${number}\n`)

        let demoObj = {}
        // *** api_mobile_list ***
        // demoObj.camp_id = randNum(1000000);
        // demoObj.api_id = randNum(10000);
        // demoObj.message_id = randStr(30);
        // demoObj.destination = randNum(1000000)
        // demoObj.psn_json = randStr(30)
        // demoObj.message = randStr(50)
        // demoObj.shortcode = (randStr(20) + randNum(1000))
        // demoObj.status = randNum(10)
        // demoObj.is_open = randNum(10)
        // demoObj.failed_reason = randStr(40)
        // demoObj.delivery_status = randStr(6)


        // *** api_info ***
        // let arr = ['active', 'inactive']
        // demoObj.id = randNum(1000000)
        // demoObj.camp_id = randNum(1000000)
        // demoObj.merchant_name = randStr(20)
        // demoObj.api_key = randStr(30)
        // demoObj.sms_config = randStr(60)
        // demoObj.custom_param_pattern = randStr(25)
        // demoObj.api_type = randNum(100)
        // demoObj.row_status = arr[Math.floor(Math.random() * arr.length)];
        // demoObj.rate_limit = randNum(100)
        // demoObj.project_owner = randStr(20)


        // *** camp_info *** 
        // let carr1 = [1, 0]
        // let carr2 = ['1', '0']
        // demoObj.id = randNum(1000000)
        // demoObj.camp_name = randStr(30)
        // demoObj.user_camp_name = randStr(30)
        // demoObj.merge_camp = carr1[Math.floor(Math.random() * carr1.length)];
        // demoObj.username = randStr(20)
        // demoObj.password = randStr(20)
        // demoObj.sms_config = randStr(15)
        // demoObj.total_uploaded_contacts = randNum(100)
        // demoObj.total_contacts = randNum(100)
        // demoObj.total_blacklist_contacts = randNum(100)
        // demoObj.message = randStr(35)
        // demoObj.secondary_message = randStr(35)
        // demoObj.sender_id = randStr(10)
        // demoObj.is_unicode = carr1[Math.floor(Math.random() * carr1.length)];
        // demoObj.status = randNum(10) > 5 ? 3: randNum(10)
        // demoObj.camp_type = carr1[Math.floor(Math.random() * carr1.length)];
        // demoObj.platform = carr1[Math.floor(Math.random() * carr1.length)];
        // demoObj.user_id = randNum(10000)
        // demoObj.rule_id = randNum(10000)
        // demoObj.template_id = randNum(10000)
        // demoObj.user_config_id = randNum(10000)
        // demoObj.ssp_config_id = randNum(10000)
        // demoObj.ssp_custom_param = randStr(20)
        // demoObj.sms_type = randStr(35)
        // demoObj.smpp_api_key = randStr(35)
        // demoObj.dnc_refund = randNum(10)
        // demoObj.primary_communication = 'SMS'
        // demoObj.secondary_communicaiton = 'SMS'
        // demoObj.dlt_template_id = randStr(15)
        // demoObj.rcs_template_id = randStr(20)
        // demoObj.is_archived = carr1[Math.floor(Math.random() * carr1.length)];
        // demoObj.flash_message = carr2[Math.floor(Math.random() * carr2.length)];

        // *** for mongoDb *** 
        // let arrM = ['english', 'marathi']
        // demoObj.messageid = randStr(30)
        // demoObj.mobileno = randNum(9999999999)
        // demoObj.content_type = arrM[Math.floor(Math.random() * arrM.length)];
        // demoObj.credits = randNum(10)
        // demoObj.error_code = randNum(10)
        // demoObj.handset_delivery_time = randStr(10)
        // demoObj.message = randStr(50)
        // demoObj.message_category = randStr(8)
        // demoObj.operator_delivery_time = randStr(10)
        // demoObj.received_time = randStr(10)
        // demoObj.senderid = randStr(6)
        // demoObj.status = randStr(12)
        // demoObj.templateid = randNum(10000000000)
        // demoObj.username = randStr(15)

        // *** sms-ctrl xlsx file
        // demoObj.Mobile = new_randNum(9999999999)
        // demoObj.var1 = randStr(30)
        // demoObj.var2 = randStr(30)
        // demoObj.var3 = randStr(30)
        // demoObj.var4 = randStr(30)
        // demoObj.var5 = randStr(30)
        // demoObj.var6 = randStr(30)
        // demoObj.var7 = randStr(30)


        // *** bharat bank demo data
        // demoObj.branch = randNum(99999);
        // demoObj.mobile_no = randNum(9999999999)
        // demoObj.sms = randStr(40)

        demoObj.username = randStr(10);
        demoObj.mobile = new_randNum(9999999999)
        demoObj.email = generateRandomEmail()


        demoArr.push(demoObj)
    }

    return demoArr;

}

// let arrObj = generateDump();
// console.log('length of arrObj: ---> ', arrObj.length);

// *** insert json to csv file ***
const jsonTocsv = async () => {
    let fields = ['username', 'mobile', 'email'];
    let arrOfObject = generateDump()
    console.log("------arrOfObject-----", arrOfObject);
    let csv = parse(arrOfObject, { fields, header: true })
    // let psv = csv.split(",").join("|")
    // console.log("----------csv----------> ", psv);
    fs.writeFile('./upload/demo.csv', csv, (err) => {
        if (err) {
            console.log('error in writing csv file ', err);
        } else {
            console.log("File written successfully.");
        }
    })
}

jsonTocsv()

// *** convert json to xlsx file ***
const jsonToXlsx = async () => {
    console.log('inside jsonToXlsx');
    try {
        let arrOfObject = generateDump()
        let workbook = xlsx.utils.book_new();
        let worksheet = xlsx.utils.json_to_sheet(arrOfObject);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
        xlsx.writeFile(workbook, './upload/test_50.xlsx')

    } catch (error) {
        console.log("error in creating xlsx file: ", error);
    }
}

// jsonToXlsx()


// *** read lines of csv file
const readCsv = () => {
    try {
        const filePath = './upload/demo.csv'
        const stream = fs.createReadStream(filePath);
        stream.on('data', (chunk) => {
            const chunkStr = chunk.toString();
            console.log(chunkStr)
        })
        stream.on('close', () => {
            console.log('File reading completed.');
        })
        stream.on('error', (error) => {
            console.error('Error occurred while reading the file:', error);
        });

    } catch (error) {
        console.log('error in readCsv: ', error)
    }
}

// readCsv()



// *** read csv file using csv-parser and readStream upto given lines
const filePath = './upload/demo.csv'
const linesToRead = 3;
let lineCount = 0;

const stream = fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    lineCount++;
    console.log(data);

    // Check if the desired line count is reached
    if (lineCount === linesToRead) {
      // Stop reading the file
      stream.pause();
    }
  })
  .on('end', () => {
    console.log('Finished reading the CSV file.');
  })
  .on('error', (error) => {
    console.error('Error occurred while reading the CSV file:', error);
  });


module.exports = {
    generateDump,

}