const { Schema, model } = require('mongoose')

const developerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    link: {
        type: String,
        required: [true, 'Link field is required']
    }
}, {
    timestamps: true
})

module.exports = model('Developer', developerSchema)