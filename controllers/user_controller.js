const User = require('../models/user_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    let newUser = new User(req.body)
    // save user to db
    newUser.password = bcrypt.hashSync(req.body.password, 10)

    newUser.save((err, user) => {
        if(err) {
            return res.status(400).send({
                message: err
            })
        }
        else {
            user.password = undefined
            return res.json(user)
        }
    })
}

const login = (req, res) => {
    User.findOne({
        email: req.body.email,
    })
        .then(user => {
            if(!user || !user.comparePassword(req.body.password))
            {
                return res.status(401).json({
                    message: "Authentication failed. Invalid Email or Password"
                })
            }

            // create token
            res.json({
                token: jwt.sign({
                    email: user.email, 
                    username: user.username,
                    _id: user._id
                }, 'directory_of_games')
            })
        })
        .catch(err => {
            throw err
        })
}

const loginRequired = (req, res, next) => {
    if(req.user) {
        next()
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized user!'
        })
    }
}

module.exports = {
    register,
    login,
    loginRequired
}