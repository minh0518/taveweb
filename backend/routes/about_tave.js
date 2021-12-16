const express = require('express');
const logger = require('../config/winston');

const s3 = require('../config/s3');
const upload = require('../config/s3');
const path = require('path');
const fs = require('fs');

const Board = require('../models/board');
const { json } = require('body-parser');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    logger.warn('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const about_tave = await Board.findAll(
                {
                    attributes: ['id', 'title', 'content'],
                },
                {
                    where: { category: { values: 'tave' } },
                }
            );
            res.status(200).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .post(upload.single('img_url'), async (req, res, next) => {
        try {
            const about_tave = await Board.create({
                category: 'tave',
                title: req.body.title,
                content: req.body.content,
                img_url: req.file.location,
                img_description: req.body.img_description,
            });
            res.status(201).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .patch(async (req, res, next) => {
        try {
            const about_tave = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'tave' } }
            );
            res.status(201).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

module.exports = router;
