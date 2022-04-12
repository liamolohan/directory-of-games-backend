const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title field is required']
    },
    slug: {
        type: String,
        required: [true, 'title field is required']
    },
    description: {
        type: String,
        required: [true, 'description field is required']
    },
    age_rating: {
        type: String,
        required: [true, 'age rating field is required']
    },
    images: {
        type: String,
        required: [true, 'Game image is required']
    },
    developers: {
        type: Schema.Types.ObjectId,
        ref: "Developer",
        // required: [true, 'developers field is required']
    },
    publishers: {
        type: String,
        required: [true, 'publishers field is required']
    },
    initial_release_date: {
        type: String,
        required: [true, 'Release date field is required']
    },
    store: {
        type: String,
        required: [true, 'Store field is required']
    },
    price: {
        type: String,
        required: [true, 'Price field is required']
    }
}, {
    timestamps: true
})

module.exports = model('Game', gameSchema)