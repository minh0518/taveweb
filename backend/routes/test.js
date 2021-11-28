const express = require('express');
const Question = require('../models/question');
const Json = require('../models/json');

const router = express.Router();

router
    .route('/jsons')
    .post(async (req, res, next) => {
        let json_sample = {
            key1: 'value1',
            key2: 'value2',
            array: ['child1', 'child2'],
        };
        json_sample = req.body.content;
        try {
            const json_one = await Json.create({
                content: json_sample,
            });
            console.log(json_one);
            res.status(201).json(json_one);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const json_one = await Json.findAll({});
            console.log(json_one);
            res.status(201).json(json_one);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
