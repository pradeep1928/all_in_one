function randStr(length) {
    let strresult           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        strresult += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return strresult;
}

const randNum = (num) => {
    const numresult =  Math.floor(Math.random() * num )
    return numresult
}

console.log(randStr(15));
console.log(randNum(10));

const generateDump = () => {
    let demoMysqlArr = [];
    let demoMongoArr = [];
    
    for (let i = 0; i < 10; i++) {
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
        let arrM = ['english', 'marathi']
        demoObj.messageid = randStr(30)
        demoObj.mobileno = randStr(50)
        demoObj.content_type = arrM[Math.floor(Math.random() * arrM.length)];
        demoObj.credits = randNum(10)
        demoObj.error_code = randNum(10)
        demoObj.handset_delivery_time = randStr(10)
        demoObj.message = randStr(50)
        demoObj.message_category = randStr(8)
        demoObj.operator_delivery_time = randStr(10)
        demoObj.received_time = randStr(10)
        demoObj.senderid = randStr(6)
        demoObj.status = randStr(12)
        demoObj.templateid = randNum(10000000000)
        demoObj.username = randStr(15)
    
        demoMysqlArr.push(demoObj)
    }

    return demoMysqlArr;
    
}

console.log("demoArr: ----", generateDump())




module.exports = {
    generateDump,

}