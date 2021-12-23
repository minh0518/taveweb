const express = require('express');
const logger = require('../config/winston');

const s3 = require('../config/s3');
const { aboutTaveUpload } = require('../config/s3');
const path = require('path');
const fs = require('fs');

const Board = require('../models/board');
const { json } = require('body-parser');
const Image = require('../models/image');

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
                    include: [
                        {
                            model: Image,
                            attributes: ['image_url', 'image_description'],
                        },
                    ],
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

    .post(aboutTaveUpload.single('image_url'), async (req, res, next) => {
        try {
            const about_tave = await Board.create({
                category: 'tave',
                title: req.body.title,
                content: req.body.content,
            });
            const about_tave_image = await Image.create({
                image_url: req.file.location,
                image_description: req.body.image_description,
                board_id: about_tave.id,
            });
            res.status(201).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .patch(aboutTaveUpload.single('image_url'), async (req, res, next) => {
        try {
            const about_tave = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'tave' } }
            );
            //logger.debug(about_tave); //about_tave 자체가 id값을 가짐
            const about_tave_image = await Image.update(
                {
                    image_url: req.file.location,
                    image_description: req.body.image_description,
                },
                { where: { board_id: about_tave } }
            );
            res.status(201).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .delete(async (req, res, next) => {
        try {
            const about_tave = await Board.destroy({
                where: { category: 'tave' },
            });
            const about_tave_image = await Image.destroy({
                where: { board_id: about_tave },
            });
            res.status(200).json(true);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

module.exports = router;
