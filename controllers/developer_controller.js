const Developer = require('../models/developer_schema')

const getAllDevelopers = (req, res) => {
    Developer.find()
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json("No Developers Found")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const getSingleDeveloper = (req, res) => {
    Developer.findById(req.params.id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json(`Developer with id: ${req.params.id} not found`)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const addNewDeveloper = (req, res) => {
    let developerData = new Developer(req.body)

    Developer.create(developerData)
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

const updateDeveloper = (req, res) => {
    let developerData = req.body

    Developer.findByIdAndUpdate(req.params.id, developerData)
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

const deleteDeveloper = (req, res) => {
    let developerData = req.body

    Developer.findByIdAndDelete(req.params.id, developerData)
        .then((data) => {
            if(data){
                res.status(200).json(data)
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
    getAllDevelopers,
    getSingleDeveloper,
    addNewDeveloper,
    updateDeveloper,
    deleteDeveloper
}