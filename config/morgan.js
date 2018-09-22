const fs = require("fs")
const morgan = require("morgan")
const appRoot = require("app-root-path")

module.exports = function(app) {
    const accessLogStream = fs.createWriteStream(`${appRoot}/logs/app_access.log`, { flags: "w" })
    app.use(morgan("combined", { stream: accessLogStream }))
}
