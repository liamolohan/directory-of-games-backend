const Game = require('../models/game_schema')

const getAllGames = (req, res) => {
    Game.find().populate('developers')
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json("No Games Found")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const getSingleGame = (req, res) => {
    Game.findById(req.params.id).populate('developers')
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json(`Game with id: ${req.params.id} not found`)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const addNewGame = (req, res) => {
    let gameData = req.body

    Game.create(gameData)
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

const updateGame = (req, res) => {
    let gameData = req.body

    Game.findByIdAndUpdate(req.params.id, gameData)
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

const deleteGame = (req, res) => {
    let gameData = req.body

    Game.findByIdAndDelete(req.params.id, gameData)
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
    getAllGames,
    getSingleGame,
    addNewGame,
    updateGame,
    deleteGame
}