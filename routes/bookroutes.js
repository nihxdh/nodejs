const express = require('express');
const mongoose = require('mongoose');

const book = require('../models/books');
const router = express.Router();

const authentication = require("../middleware/adminAuth");

router.post('/create', authentication, async (req, res) => {
    try {
        const books = new book({
            title: req.body.title,
            author: req.body.author,
            publishedDate: req.body.publishedDate,
        })
        if (!books.title || !books.author || !books.publishedDate) {
            return res.status(400).json({ message: 'Required all fields' })
        }
        const existingBook = await books.findOne({ title });
        
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
        if (!books) {   
            return res.status(404).json({ message: 'No Book found' });
        }
        res.status(200).json(books);
    } catch (err) { res.status(400).json({ message: 'Book not found' }) }
})

router.put('/books/:id', async (req, res) => {
    try {
        const books = await book.findById(req.params.id);
        if (!books) {
            return res.status(404).json({ message: "Book not Found!" })
        }
        const updatedBook = await book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedBook);
    }
    catch (err) {
        res.status(400).json({ message: 'Error in updating!' })
    }
})

router.delete('/books/:id', async (req, res) => {
    try {
        const books = await book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "No book Found!" })
        }
        const deleteBook = await book.findByIdAndDelete(req.params.id)
        res.json({ message: 'Book Deleted' })
    }
    catch (err) {
        res.status(404).json({ message: 'Error!' })
    }
})

module.exports = router;