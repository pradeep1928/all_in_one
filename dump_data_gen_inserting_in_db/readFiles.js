const { getXlsxStream } = require("xlstream");
const xlsx = require('xlsx');
const mysql = require("mysql2");
const excelToJson = require("convert-excel-to-json");
const fs = require('fs');
const csv = require('csv-parser');
const Transform = require('stream').Transform




const file_path = `./upload/5L_Contacts_1.xls`
const readStream = fs.createReadStream(file_path);
const streamParser = xlsx.createStream();

readStream.pipe(streamParser);

streamParser.on('worksheet', worksheet => {
    worksheet.on('data', row => {
        console.log(row)
    });
    worksheet.on('end', () => {
        console.log('Sheet processing is done')
    })
})