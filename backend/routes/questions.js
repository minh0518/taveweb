const express = require('express');
const Question = require('../models/question');
const Answer = require('../models/answer');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const questions = await Question.findAll({
                attributes: ['id', 'title', 'content'],
            });
            res.json({ questions });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const question = await Question.create({
                title: req.body.title,
                content: req.body.content,
                password: req.body.password,
            });
            console.log(question);
            res.status(201).json(question);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            console.log(req.params.id);
            const question = await Question.findOne({
                attributes: ['id', 'title', 'content'],
                where: { id: req.params.id },
            });
            res.status(200).json({ question });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            console.log(req.params.id);
            const question = await Question.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ question });
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/:id/password').get(async (req, res, next) => {
    try {
        const question = await Question.findOne({
            where: { id: req.params.id, password: req.body.password },
        });
        res.status(200).json({ check: question !== null });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
