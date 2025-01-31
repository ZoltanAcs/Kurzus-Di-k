const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Diákok modell
const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
}));

// Kurzusok modell
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
}));

// Kurzusok lekérése
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Diákok lekérése
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Kurzus létrehozása
router.post('/courses', async (req, res) => {
    const newCourse = new Course({
        name: req.body.name,
    });
    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Diák létrehozása
router.post('/students', async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
    });
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Kurzus módosítása
router.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Diák módosítása
router.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Kurzus törlése
router.delete('/courses/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

// Diák törlése
router.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
