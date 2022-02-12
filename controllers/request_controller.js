const RequestGame = require('../models/request_schema')

const addNewRequest = (req, res) => {
    let requestData = req.body

    RequestGame.create(requestData)
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

module.exports = {
    addNewRequest
}