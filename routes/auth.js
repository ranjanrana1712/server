const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/User')

const router = express.Router();

router.post('/register',async(req,res)=>{
    try {
        const { username, email, password} = req.body;

        //check if useralready exists
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message:'user already exists'
            })
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        user = new User({
            username,
            email,
            password:hashedPassword
        });

        await user.save();
        
        //create jwt and return jwt 
        //provide a secure and efficient way to manage user authentication and authorization

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET,{expiresIn:'1hr'});
        res.status(201).json({token});
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'server error'});   
    }
})
module.exports = router;