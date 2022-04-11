const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('./db') ()

// Import controller here
const { getAllGames, getSingleGame, addNewGame, updateGame, deleteGame } = require('./controllers/game_controller')
const { register, login, loginRequired } = require('./controllers/user_controller')
const { getAllRequests, getSingleRequest, addNewRequest, updateRequest  } = require('./controllers/request_controller')

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
// Games //
app.get('/games', getAllGames)
app.get('/games/:id', getSingleGame)
app.get('/games-dashboard', loginRequired, getAllGames)
app.post('/games', loginRequired, addNewGame)
app.put('/games/:id', loginRequired, updateGame)
app.delete('/games/:id', loginRequired, deleteGame)

// Requests //
app.post('/request-game', loginRequired, addNewRequest)
app.get('/requests/:id', loginRequired, getSingleRequest)
app.get('/requests-dashboard', loginRequired, getAllRequests)

app.put('/requests/:id', loginRequired, updateRequest)

//// LOGGED OUT ROUTES ////
app.post('/register', register)
app.post('/login', login)

////////////////////////////////

app.listen(port, () => {
    console.log(`Directory of Games Backend listening at http://localhost:${port}`)
})