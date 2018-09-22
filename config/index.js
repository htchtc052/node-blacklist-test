const config = {
    database: {
        uri: process.env.DATABASE_URI || "mongodb://localhost:27017/node-blacklist-test"
    },
    jwt: {
        refresh_secret: process.env.JWT_REFRESH_SECRET || "secret_str",
        secret: process.env.JWT_SECRET || "secret_str",
        token_life: "10m",
        token_refresh_life: "30m"
    },
    app: {
        port: process.env.APP_PORT || 8000
    },
    env: process.env.NODE_ENV || "development"
}

module.exports = config
