const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        solution: {
            type: String,
        }
    },
)

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;