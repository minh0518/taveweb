const express = require('express');
const logger = require('../config/winston');

const s3 = require('../config/s3');
const upload = require('../config/s3');
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
            const news = await Board.findAll(
                {
                    attributes: ['title', 'content'],
                    include: [
                        {
                            model: Image,
                            attributes: ['image_url', 'image_description'],
                        },
                    ],
                },
                {
                    where: { category: { values: 'news' } },
                }
            );
            res.status(200).json({ news });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .post(upload.single('image_url'), async (req, res, next) => {
        try {
            const news = await Board.create({
                category: 'news',
                title: req.body.title,
                content: req.body.content,
            });
            const news_image = await Image.create({
                image_url: req.file.location,
                image_description: req.body.image_description,
                board_id: news.id,
            });
            res.status(201).json({ news });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    
    .patch(upload.single('image_url'), async (req, res, next) => {
        try {
            const news = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'news' } }
            );

            const news_image = await Image.update(
                {
                    image_url: req.file.location,
                    image_description: req.body.image_description,
                },
                { where: { board_id: news } }
            ); //histor 자체가 자체가 id값을 가짐
            res.status(201).json({ news });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    

    .delete(async (req, res, next) => {
        try {
            const news = await Board.destroy({
                where: { category: 'news' },
            });
            const news_image = await Image.destroy({
                where: { board_id: news },
            });
            res.status(200).json(true);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

module.exports = router;