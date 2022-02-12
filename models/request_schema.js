const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
    gameTitle: {
        type: String,
        required: [true, 'Game title is required']
    },
    gameLink: {
        type: String,
        required: [true, 'Game link is required']
    },
})

module.exports = model('RequestGame', requestSchema)