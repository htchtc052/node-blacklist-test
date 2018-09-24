const createError = require("http-errors")
const jwt = require("jsonwebtoken")

const jwtBlacklist = require("jwt-blacklist")(jwt)

const logger = require(`.././config/winston`)
const config = require(`.././config`)

const authControllers = {
    register: User => async (req, res, next) => {
        req.checkBody("name")
            .notEmpty()
            .withMessage("First required")

        req.checkBody("email")
            .notEmpty()
            .withMessage("Email required")
            .isEmail()
            .withMessage("Email error format")

        req.checkBody("password")
            .notEmpty()
            .withMessage("Password required")

        let errors = await req.getValidationResult()

        if (errors.isEmpty() === false) {
            return res.status(422).json({
                validation_errors: errors.mapped()
            })
        }

        User.findOne({ email: req.body.email })
            .then(foundUser => {
                if (foundUser) {
                    return res.status(422).json({ validation_errors: { email: "Email allready exists" } })
                }

                User.create({ name: req.body.name, email: req.body.email, password: req.body.password })
                    .then(data => {
                        console.log("data", data)
                        const user = { id: data._id, name: data.name, email: data.email }

                        const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.token_life })
                        const refreshToken = jwt.sign(user, config.jwt.refresh_secret, { expiresIn: config.jwt.token_refresh_life })

                        return res.json({ token, refreshToken, user })
                    })
                    .catch(createUserErr => {
                        return next(createError(500, `Add user error ${createUserErr}`))
                    })
            })
            .catch(checkUserErr => {
                return next(createError(500, `Add user error ${checkUserErr}`))
            })
    },
    login: User => async (req, res, next) => {
        req.checkBody("email")
            .notEmpty()
            .withMessage("Email required")
            .isEmail()
            .withMessage("Email error format")

        req.checkBody("password")
            .notEmpty()
            .withMessage("Password required")

        let errors = await req.getValidationResult()

        if (errors.isEmpty() === false) {
            return res.status(422).json({ validation_errors: errors.mapped() })
        }

        User.findOne({
            email: req.body.email
        })
            .then(checkUser =>
                checkUser.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        const user = { id: checkUser._id, name: checkUser.name, email: checkUser.email }

                        const token = jwt.sign(user, config.jwt.secret, {
                            expiresIn: config.jwt.token_life
                        })
                        const refreshToken = jwt.sign(user, config.jwt.refresh_secret, {
                            expiresIn: config.jwt.token_refresh_life
                        })
                        return res.status(200).send({ token, refreshToken, user })
                    } else {
                        return res.status(422).json({ validation_errors: { email: "Authentication failed. Wrong password" } })
                    }
                })
            )
            .catch(checkUserErr => {
                return res.status(422).json({ validation_errors: { email: "User not found" } })
            })
    },
    refreshToken: () => (req, res, next) => {
        const refreshToken = req.body.refreshToken || null

        if (refreshToken) {
            jwt.verify(refreshToken, config.jwt.refresh_secret, function(err, decoded) {
                if (err) {
                    logger.debug("Refresh token err", err)
                    return next(createError(401, "Refresh token not valid."))
                }

                const date_exp = new Date(decoded.exp * 1000)
                const date_now = new Date()
                const difference = Math.floor((date_exp.getTime() - date_now.getTime()) / 1000)

                const user = decoded
                const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.token_life })

                logger.debug(`RefreshToken user  ${user.id} date_exp ${date_exp} left ${difference} sec`)

                return res.json({ token })
            })
        } else {
            return res.status(401).json({ message: "Refresh token not provided!." })
        }
    },
    user: () => (req, res, next) => {
        if (!req.user) return next(createError(401, `User not authorized`))
        //const user = { client_id: req.decoded.client_id, email: req.decoded.email, name: req.decoded.name }
        res.status(200).json({ user: req.user })
    },

    logout: () => (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-token"]

        jwtBlacklist.blacklist(token).catch(err => {
            console.log("blacklist err " + err)
        })

        /*     jwtBlacklist.blacklist(token).catch(err => {
            logger.debug("blacklist err " + err)
        }) */

        return res.json({ ok: true })
    }
}

module.exports = authControllers
