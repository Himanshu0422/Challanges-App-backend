const express = require("express");
const router = express.Router();
const Question = require('../models/questionModel');

router.post('/question', async (req, res) => {
    try {
        const { name, description, difficulty, image, solution } = req.body;
        const newQuestion = new Question({
            name: name,
            description: description,
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

module.exports = router;