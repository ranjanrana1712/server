const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    creator:{type: mongoose.Schema.Types.ObjectId, ref:'User'  , required:true},
    title:{type: String, required:true},
    type:{ type: String, enum:['QA', 'Poll'], required: true},
    questions:[{
        text:{type:String, required: true},
        options:[{ type:String, required: true }],
        correctAnswer:{ type: Number},
        timer:{type:Number}
    }],
    impression:{type:Number, default:0}
},{timestamps:true})


module.exports = mongoose.model('Quiz', quizSchema)