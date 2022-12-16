
// const { createLogger, format, transports, config } = require('winston');
// const { combine, timestamp, colorize, json } = format;
const winston = require('winston');
var moment = require('moment');

let date = moment().format('YYYY-MM-DD-hh:mm')

const formatF = winston.format.combine(
  winston.format(info => ({ ...info, level: info.level.toUpperCase() }))(),
  winston.format.align(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
  )
)

const formatC = winston.format.combine(
  winston.format(info => ({ ...info, level: info.level.toUpperCase() }))(),
  winston.format.align(),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.prettyPrint(),
  winston.format.simple(),
  winston.format.splat(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
  )
);


const __logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console({ format: formatC }),
    new winston.transports.File({
      filename: `log/monthly_mis-${date}.log`, format: formatF }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ format: formatC }),
    // new winston.transports.File({ filename: `log/monthly_mis-${date}.log`, format: formatF})
  ]
});


module.exports = { __logger };