const express = require('express');
const logger = require('../config/winston');

const  Board  = require('../models/board');


router
    .route('/about/history')
    .get(async (req, res, next) => {
        try {            
            const boards = await Board.findAll({
            attributes: ['title, content'],
            where : {'category':'history'}
            });
            res.json({ boards });
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