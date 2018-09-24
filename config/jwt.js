const jwt = require("jsonwebtoken")
const redis = require("redis")
const config = require(`../config/index`)

const client = redis.createClient(config.redis)

client.on("error", function(err) {
    console.log("Redis connect fail" + err)
})

client.on("connect", function() {
    console.log("Redis client connected!")
})

const jwtBlacklist = require("jwt-token-blacklist")(jwt, {
    store: {
        type: "redis",
        client
    }
})

module.exports = jwtBlacklist
