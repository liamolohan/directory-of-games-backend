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
        type: [String]
    },
    developers: {
        type: String,
        required: [true, 'developers field is required']
    },
    publishers: {
        type: String,
        required: [true, 'publishers field is required']
    },
    intial_release_date: {
        type: Date,
        required: [true, 'initial release date field is required']
    },
    where_to_buy: {
        type: Object,
        required: [false, 'where to buy field is not required']
    }
})

module.exports = model('Game', gameSchema)