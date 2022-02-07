const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
}, {
    timestamps: true
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password, function(result) {
        return result
    })
}

module.exports = model('User', userSchema)