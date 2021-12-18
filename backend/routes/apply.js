const express = require('express');
const logger = require('../config/winston');

const  Applies = require('../models/apply');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const applies = await Applies.findAll({
                attributes: ['id', 'phone','name','email','apply_form'],
            });
            //res.json({ applies });
            res.status(200).json({ applies });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const apply = await Applies.create({
                phone: req.body.phone,
                name: req.body.name,
                email: req.body.email,
                apply_form: req.body.apply_form
            });
            logger.debug(apply);
            res.status(201).json(apply);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

    
    
    
module.exports = router;