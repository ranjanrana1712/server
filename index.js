const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./schema/User')


const app = express();  
// app.use(express.json())
app.use(express.urlencoded())

const port = process.env.PORT || 5000;
const dburl = process.env.DATABASE_URL;

mongoose.connect(dburl).then(()=> console.log('db connection established')).catch( err =>console.error('mongodb connection error', err));

app.get('/',(req,res)=>{
    res.send('i am in home');

})

// to create user

app.post('/user', async(req,res)=>{
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({
            message:'user registeration failed',
            error: err.message
        })
        
    }
})


app.listen(port,(error)=>{
console.log(`server is runnng on ${port}`),error
})