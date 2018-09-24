const config = {
    database: {
        uri: process.env.DATABASE_URI || "mongodb://localhost:27017/node-blacklist-test"
    },
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
        options: {}
    },
    jwt: {
        refresh_secret: process.env.JWT_REFRESH_SECRET || "secret_str",
        secret: process.env.JWT_SECRET || "secret_str",
        token_life: "4m",
        token_refresh_life: "30m"
    },
    app: {
        port: process.env.APP_PORT || 8000
    },
    env: process.env.NODE_ENV || "development"
}

module.exports = config
