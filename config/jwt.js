const jwt = require("jsonwebtoken")
const redis = require("redis")

const server = {
    host: "127.0.0.1",
    port: 6379,
    options: {}
}

const client = redis.createClient(server)

client.on("error", function(err) {
    console.log("Redis connect fail" + err)
})

client.on("connect", function() {
    console.log("Redis client connected!")
})

const jwtBlacklist = require("jwt-blacklist")(jwt, {
    store: {
        type: "redis",
        client
    }
})

module.exports = jwtBlacklist
