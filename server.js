const express = require("express")
const bodyParser = require("body-parser")
const createError = require("http-errors")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const dotenv = require("dotenv")

dotenv.load()

const config = require(`./config`)
const logger = require(`./config/winston`)

require(`./config/morgan`)(app)

app.use((req, res, next) => {
    req.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress
    req.referer = req.headers.referer
    return next()
})

app.use(cors())
const jsonParser = bodyParser.json()
app.use(jsonParser)

var expressValidator = require("express-validator")

app.use(
    expressValidator({
        errorFormatter: function(param, msg, value) {
            console.log(param, msg, value)
            return msg
        }
    })
)

mongoose
    .connect(
        config.database.uri,
        {
            useNewUrlParser: true
        }
    )
    .then(() => logger.info("DB connect ok"))
    .catch(err => logger.error(createError(500, "Db connection error:" + err)))

const routes = require("./routes")

app.use(routes)

app.use((req, res, next) => {
    const err = new Error("Route not found")
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next) {
    const error_status = err.status || 500

    logger.error(`${error_status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)

    res.status(error_status).send(process.env.NODE_ENV == "development" ? err.message : "Server error.")
})

const port = config.app.port

app.listen(port, err => {
    if (err) {
        logger.error(err)
        process.exit(1)
    }
    logger.info(`API is now running on port ${port} in  ${process.env.NODE_ENV} mode`)
})
