const express = require('express');
const logger = require('../config/winston');

const  FaQ  = require('../models/faq');


const router = express.Router();
 
router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const faqs = await FaQ.findAll({
                attributes: ['id', 'title', 'question'],
            });
            res.json({ faqs });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const faq = await FaQ.create({
                title: req.body.title,
                question: req.body.question,
                answer: req.body.answer,
            });
            logger.debug(faq);
            res.status(201).json(faq);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const faq = await FaQ.findOne({
                attributes: ['id', 'title', 'question', 'answer'],
                where: { id: req.params.id },
            });
            res.status(200).json({ faq });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const faq = await FaQ.update(
                {
                    title: req.body.title,
                    question: req.body.question,
                    answer: req.body.answer,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ faq });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await FaQ.destroy(
                {
                    where: { id: req.params.id },
                }
            );
            res.json(result);
        } catch (err) {
            logger.error(err);
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
        logger.error(err);
        next(err);
    }
});

module.exports = router;
