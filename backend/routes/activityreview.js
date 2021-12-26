const express = require('express');
const logger = require('../config/winston');

const { s3, newsUpload } = require('../config/s3');
const path = require('path');
const fs = require('fs');
const url = require('url');

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
            const activity_review = await Board.findAll(
                {
                    attributes: ['id', 'title', 'content'],
                    include: [
                        {
                            model: Image,
                            attributes: [
                                'image_key',
                                'image_url',
                                'image_description',
                            ],
                        },
                    ],
                },
                {
                    where: { category: { values: 'activity_review' } },
                }
            );
            res.status(200).json({ news });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
