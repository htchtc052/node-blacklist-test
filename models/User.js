let mongoose = require("mongoose")
let bcrypt = require("bcrypt")
let Schema = mongoose.Schema

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

UserSchema.pre("save", function(next) {
    var user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
module.exports = mongoose.model("User", UserSchema)
