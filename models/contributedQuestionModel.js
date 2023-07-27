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
            required: true,
        },
        solution: {
            type: String,
            required: true,
        }
    },
)

const ContributedQuestionModel = mongoose.model('Contributed-Question', questionSchema);

module.exports = ContributedQuestionModel;