const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Game title is required']
    },
    link: {
        type: String,
        required: [true, 'Game link is required']
    },
    request_status: {
        type: String,
        required: [true, 'request status is required']
    }
}, {
    timestamps: true
})

module.exports = model('requestGame', requestSchema)