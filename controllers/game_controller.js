const Game = require('../models/game_schema')

const getAllGames = (req, res) => {
    Game.find()
        .then((data) => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json("No games found")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
}

const getSingleGame = (req, res) => {
    Game.findById(req.params.id)
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

module.exports = {
    getAllGames,
    getSingleGame,
    addNewGame
}