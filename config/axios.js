process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let axios = require("axios")

axios.interceptors.request.use(function(config) {
    config.auth = {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
    }
    config.rejectUnauthorized = false
    let headers = {
        "Accept-Encoding": "gzip",
        "Content-type": "application/x-www-form-urlencoded",
        "User-Agent": "Ubersmith nodejs API module"
    }

    config.headers = headers

    return config
})

module.exports = axios
