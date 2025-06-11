const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');

router.post('/create', async (req, res) => {
    try {
        const users = new user({
            userName: req.body.userName,
            phoneNo: req.body.phoneNo,
            book: req.body.book
        })
        if (!users.userName || !users.phoneNo || !users.book) {
            return res.status(400).json({ message: 'Required all fields' })
        }
        const newUser = await users.save();
        res.status(201).json(newUser);
    } catch (err) { res.status(500).json({ message: 'ERROR!' }) }
})

router.get('/view', async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'ERROR!' })
    }
})

router.get('/view/:id', async (req, res) => {
    try {
        const users = await user.findById(req.params.id);
        if (!users) {
            return res.status(404).json({ message: 'No user found!' })
        }
        res.status(200).json(users);
    } catch (err) { res.status(500).json({ message: 'ERROR!' }) }
})

router.put('/view/:id', async (req, res) => {
    try {
        const users = await user.findById(req.params.id);
        if (!users) {
            return res.status(404).json({ message: "USer not Found!" })
        }
        const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: 'Error in updating!' })
    }
})

router.delete('/view/:id', async (req, res) => {
    try {
        const users = await user.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No user Found!" })
        }
        const deleteUser = await user.findByIdAndDelete(req.params.id)
        res.json({ message: 'user Deleted' })
    }
    catch (err) {
        res.status(404).json({ message: 'Error!' })
    }
})

module.exports = router;