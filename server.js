const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('./db') ()

// Import controller here
const { getAllGames, getSingleGame, addNewGame, updateGame, deleteGame } = require('./controllers/game_controller')
const { register, login, loginRequired } = require('./controllers/user_controller')
const { addNewRequest } = require('./controllers/request_controller')

/////////////

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

/////////////

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], 'directory_of_games', (err, decode) => {
            if(err) req.user = undefined
            req.user = decode
            next()
        })
    }
    else {
        req.user = undefined
        next()
    }
})


//////////// ROUTES ////////////
app.get('/games', getAllGames)
app.get('/games/:id', getSingleGame)
app.post('/games', loginRequired, addNewGame)
app.put('/games/:id', loginRequired, updateGame)
app.delete('/games/:id', loginRequired, deleteGame)

//// LOGGED OUT ROUTES ////
app.post('/register', register)
app.post('/login', login)

//// ADMIN ROUTES ////
app.post('/dashboard', loginRequired, getAllGames)

//// USER ROUTES ////
app.post('/request-game', loginRequired, addNewRequest)

////////////////////////////////

app.listen(port, () => {
    console.log(`Directory of Games Backend listening at http://localhost:${port}`)
})