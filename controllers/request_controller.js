const RequestGame = require('../models/request_schema')

const getAllRequests = (req, res) => {
    RequestGame.find()
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json("No Requests Found")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const getSingleRequest = (req, res) => {
    RequestGame.findById(req.params.id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json(`Request with id: ${req.params.id} not found`)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const addNewRequest = (req, res) => {
    let requestData = new requestGame(req.body)

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

const updateRequest = (req, res) => {
    let requestData = req.body

    RequestGame.findByIdAndUpdate(req.params.id, requestData)
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
    getAllRequests,
    getSingleRequest,
    addNewRequest,
    updateRequest
}