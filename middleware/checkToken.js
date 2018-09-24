const jwt = require("jsonwebtoken")
const config = require(`../config`)
const logger = require(`../config/winston`)
const createError = require("http-errors")

module.exports = (req, res, next) => {
    //return next(createError(401, "Check token error. Token expired"))
    const token = req.body.token || req.query.token || req.headers["x-token"]

    req.token = token

    if (token) {
        /*  jwt.verify(token, config.jwt.secret)
            .then(decoded => {
                const date_exp = new Date(decoded.exp * 1000)
                const date_now = new Date()
                const difference = Math.floor((date_exp.getTime() - date_now.getTime()) / 1000)

                req.user = decoded

                logger.debug(`Token valid user ${req.user.id}  date_exp ${date_exp} left ${difference} sec`)

                next()
            })
            .catch(verifyErr => {
                return next(createError(401, verifyErr))
            }) */
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            console.log("jwt.verify ", "err", err, "decoded", decoded)

            if (err) {
                return next(createError(401, err))
            }
            const date_exp = new Date(decoded.exp * 1000)
            const date_now = new Date()
            const difference = Math.floor((date_exp.getTime() - date_now.getTime()) / 1000)

            req.user = decoded

            logger.debug(`Token valid user ${req.user.id}  date_exp ${date_exp} left ${difference} sec`)

            next()
        })
    } else {
        return next(createError(403, "Check token error. No token"))
    }
}
