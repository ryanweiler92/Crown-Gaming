const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

const GameSchema = new Schema (
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false
        },
        background_image: {
            type: String,
            required: false
        },
        metacritic: {
            type: String,
            required: false
        },
        playTime: {
            type: String,
            required: false
        },
        released: {
            type: String,
            required: false
        },
        genres: [
            {
                type: String
            }
        ],
        screenshots: [
            {
                type: String
            }
        ],
        tags: [
            {
                type: String
            }
        ],
        developers: [
            {
                type: String
            }
        ],
        platforms: [
            {
                type: String
            }
        ],
        stores: [
            {
                type: String
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = GameSchema