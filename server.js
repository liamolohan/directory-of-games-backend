const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db') ()

// Import controller here
const { getAllGames, getSingleGame, addNewGame } = require('./controllers/game_controller')
const { register, login } = require('./controllers/user_controller')

/////////////

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

/////////////


//////////// ROUTES ////////////
app.get('/games', getAllGames)
app.get('/games/:id', getSingleGame)
app.post('/games', addNewGame)

//// USER ROUTES ////
app.post('/register', register)
app.post('/login', login)

////////////////////////////////

app.listen(port, () => {
    console.log(`Directory of Games Backend listening at http://localhost:${port}`)
})