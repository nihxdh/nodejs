const express = require('express');
const mongoose = require('mongoose');

const book = require('../models/books');
const e = require('express');
const router = express.Router();

// router.post('/create', async (req, res) =>{

//     const books = new book({
//         title: req.body.title,
//         author: req.body.author,
//         publishedDate: req.body.publishedDate,
//     });
//     const newbook = await books.save();
//     res.status(201).json(newbook);
// })

router.post('/create', async (req, res) => {
    try {
        const books = new book({
            title: req.body.title,
            author: req.body.author,
            publishedDate: req.body.publishedDate,
        })
        if (!books.title || !books.author || !books.publishedDate) {
            return res.status(400).json({ message: 'Required all fields' })
        }
        const newbook = await books.save();
        res.status(201).json(newbook);
    } catch (err) { res.status(500).json({ message: err.message }) }
})

router.get('/books', async (req, res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    } catch (err) { res.status(500).json({ message: err.message }) }
})

router.get('/books/:id', async (req, res) => {
    try {
        const books = await book.findById(req.params.id);
        res.status(200).json(books);
        if (!books) {
            return res.status(404).json({ message: 'No Book found' })
        }
    } catch (err) { res.status(500).json({ message: 'Book not found' }) }
})

// router.put()

module.exports = router;