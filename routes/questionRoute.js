const express = require("express");
const router = express.Router();
const Question = require('../models/questionModel');
const ContributedQuestion = require('../models/contributedQuestionModel');

router.post('/question', async (req, res) => {
    try {
        const { name, description, topic, difficulty, image, solution } = req.body;
        const newQuestion = new Question({
            name: name,
            description: description,
            topic: topic,
            difficulty: difficulty,
            image: image,
            solution: solution
        })
        
        await newQuestion.save();
        res.status(200).send({
            message: "Question Submitted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error submitting question",
            success: false,
        });
    }
});

router.post('/contibuted-question', async (req, res) => {
    try {
        const { name, description, topic, difficulty, image, solution } = req.body;
        const newQuestion = new ContributedQuestion({
            name: name,
            description: description,
            topic: topic,
            difficulty: difficulty,
            image: image,
            solution: solution
        })
        
        await newQuestion.save();
        res.status(200).send({
            message: "Question Submitted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error submitting question",
            success: false,
        });
    }
});

router.get('/question', async (req, res) => {
    try {
        const data = await Question.find({
            topic: req.query.topic
        });

        res.status(200).send({
            message: 'question fetched successfully',
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            message: "Error getting questions",
            success: false,
        });
    }
});

router.get('/questionbyid', async (req, res) => {
    try {
        const data = await Question.find({
            _id: req.query.questionId
        })
        res.status(200).send({
            message: "Question fetched successfully",
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            message: "Error getting question",
            success: false,
        });
    }
})

module.exports = router;