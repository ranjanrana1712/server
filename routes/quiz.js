const express = require('express');
const quizSchema = require('../schema/quiz');


const router = express.Router();

router.post('/create', async(req,res)=>{

    try {
        const { title, type, questions } = req.body;

        const quiz = new quizSchema({
            creator: req.user.id,
            title,
            type,
            questions
        });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server error'})
        
    }
})

module.exports = router;