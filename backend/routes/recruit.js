const express = require('express');
const logger = require('../config/winston');

const  Recruit = require('../models/recruit');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const recruits = await Recruit.findAll({
                attributes: ['id', 'title','generation','recruit_form'],
            });
            res.status(200).json({ recruits });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const recruit = await Recruit.create({
                title: req.body.title,
                generation: req.body.generation,
                recruit_form: req.body.recruit_form
            });
            logger.debug(recruit);
            res.status(201).json(recruit);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });   
    
    
module.exports = router;