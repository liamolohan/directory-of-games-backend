const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
        required: [true, 'Email is required'],
        validate: [validateEmail, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'role required']
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