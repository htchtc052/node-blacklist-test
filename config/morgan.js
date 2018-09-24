const fs = require("fs")
const morgan = require("morgan")

module.exports = function(app) {
    const accessLogStream = fs.createWriteStream(`./logs/app_access.log`, { flags: "w" })
    app.use(morgan("combined", { stream: accessLogStream }))
}
