var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    correct_answer: String,
    incorrect_answers: [String], // Массив строк
    category: String,
    difficulty: String
});

module.exports = mongoose.model('question', questionSchema);