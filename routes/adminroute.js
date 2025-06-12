const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async(req,res) =>{
    try {
        const {username,password} = req.body;
        if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({message : "Invalid Username or Password"})
        }
        const token = jwt.sign(
            {isAdmin : true},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        );
        res.json({token})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


module.exports = router;
