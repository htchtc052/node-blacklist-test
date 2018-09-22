const appRoot = require("app-root-path")
const winston = require("winston")

const winstonLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "error",
            filename: `${appRoot}/logs/app.log`,
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            format: winston.format.combine(winston.format.json())
        }),
        new winston.transports.Console({
            level: process.env.NODE_ENV == "development" ? "debug" : "info",
            handleExceptions: true,
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
    ],
    exitOnError: false
})

module.exports = winstonLogger
