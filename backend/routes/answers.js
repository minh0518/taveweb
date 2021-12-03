const express = require('express');
const Answer = require('../models/answer');
const { logger } = require('../config/winston');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const answers = await Answer.findAll({
                attributes: ['id', 'content', 'question_id'],
            });
            res.status(200).json({ answers });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            logger.debug(req.body.question_id);
            const answer = await Answer.create({
                content: req.body.content,
                question_id: req.body.question_id,
            });
            //console.log(answer);
            res.status(201).json(answer);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router
    .route('/:id')
    .patch(async (req, res, next) => {
        try {
            const answer = await Answer.update(
                {
                    content: req.body.content,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ answer });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Answer.destroy({
                where: { id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
