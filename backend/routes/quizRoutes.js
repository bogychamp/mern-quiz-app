var express = require('express');
var router = express.Router();
var axios = require('axios');
var QuestionModel = require('../models/questionModel');
var UserModel = require('../models/userModel');


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


router.get('/start', async function(req, res) {
    try {
        const count = await QuestionModel.countDocuments({});
        if (count === 0) {
            console.log("Database is empty. Fetching questions from Open Trivia API...");
            const response = await axios.get('https://opentdb.com/api.php?amount=20&type=multiple');
            
            if (response.data && response.data.results) {
                const questionsToSave = response.data.results.map(q => ({
                    question: q.question,
                    correct_answer: q.correct_answer,
                    incorrect_answers: q.incorrect_answers,
                    category: q.category,
                    difficulty: q.difficulty
                }));
                await QuestionModel.insertMany(questionsToSave);
                console.log("Questions successfully saved to MongoDB!");
            }
        }

        const questions = await QuestionModel.aggregate([{ $sample: { size: 10 } }]);

        if (questions.length === 0) {
            return res.status(400).json({ error: "No questions found in the database." });
        }

        req.session.quiz = {
            questions: questions,
            currentIndex: 0,
            totalScore: 0
        };

        req.session.questionStartTime = Date.now();
        const currentQ = questions[0];
        const options = shuffle([...currentQ.incorrect_answers, currentQ.correct_answer]);

        res.json({
            questionNumber: 1,
            question: currentQ.question,
            options: options
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error starting quiz", details: err.message });
    }
});


router.post('/answer', function(req, res) {
    if (!req.session.quiz) return res.status(400).json({ message: "Quiz not started" });

    const userAnswer = req.body.answer; 
    const quiz = req.session.quiz;
    const currentQ = quiz.questions[quiz.currentIndex];

    const timeTaken = (Date.now() - req.session.questionStartTime) / 1000;
    const grade = (userAnswer === currentQ.correct_answer) ? 1 : 0;
    
    
    const n = 100 * grade;
    const k = 0.2;
    const questionScore = Math.round(n * Math.exp(-k * timeTaken)); 

    quiz.totalScore += questionScore;
    quiz.currentIndex++;

    if (quiz.currentIndex < quiz.questions.length && quiz.currentIndex < 10) {
        const nextQ = quiz.questions[quiz.currentIndex];
        const options = shuffle([...nextQ.incorrect_answers, nextQ.correct_answer]);

        req.session.questionStartTime = Date.now();

        res.json({
            
            message: grade === 1 ? "Correct!" : "Incorrect!",
            pointsEarned: questionScore,
            timeTaken: timeTaken,
            nextQuestion: {
                questionNumber: quiz.currentIndex + 1,
                question: nextQ.question,
                options: options
            }
        });
    } else {
        
        const finalScore = quiz.totalScore;
        const userId = req.session.userId; 
        
        delete req.session.quiz; 

      
        if (userId) {
            UserModel.findById(userId, async function(err, user) {
                if (user) {
                    user.gamesHistory.push({ score: finalScore });

                    if (finalScore > user.highScore) {
                        user.highScore = finalScore;
                    }

                    await user.save();
                    console.log(`Score ${finalScore} saved for user ${user.username}`);
                }
            });
        }

        res.json({
            
            message: "Quiz Completed!",
            finalScore: finalScore
        });
    }
});


router.get('/leaderboard', async function(req, res) {
    try {
        const topPlayers = await UserModel.find({}, 'username highScore')
                                          .sort({ highScore: -1 })
                                          .limit(10);
                                          
        res.json(topPlayers);
    } catch (err) {
        res.status(500).json({ error: "Error loading leaderboard", details: err.message });
    }
});

module.exports = router;