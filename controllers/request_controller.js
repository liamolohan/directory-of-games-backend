const requestGame = require('../models/request_schema')

const addNewRequest = (req, res) => {
    let requestData = new requestGame(req.body)

    requestGame.create(requestData)
        .then((data) => {
            if(data){
                res.status(201).json(data)
            }
        })
        .catch((err) => {
            if(err.name === "ValidationError"){
                res.status(422).json()
            }
            else{
                console.log(err)
                res.status(500).json(err)
            }
        })
}

// const register = (req, res) => {
//     let newUser = new User(req.body)
//     // save user to db

//     newUser.save((err, user) => {
//         if(err) {
//             return res.status(400).send({
//                 message: err
//             })
//         }
//         else {
//             user.password = undefined
//             return res.json(user)
//         }
//     })
// }

module.exports = {
    addNewRequest
}