const express = require('express');
const logger = require('../config/winston');

const { s3, newsUpload } = require('../config/s3');
const { aboutHistoryUpload } = require('../config/s3');
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
            const history = await Board.findAll(
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
                    where: { category: { values: 'history' } },
                }
            );
            res.status(200).json({ history });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .post(aboutHistoryUpload.array('images'), async (req, res, next) => {
        try {
            const about_history = await Board.create({
                category: 'about_history',
                title: req.body.title,
                content: req.body.content,
            });

            img_desc_json = JSON.parse(req.body.image_description);

            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const about_history_image = await Image.create({
                        image_key: file.key,
                        image_url: file.location,
                        image_description: img_desc_json[file.originalname],
                        board_id: about_history.id,
                    });
                })
            );
            res.status(201).json({ about_history });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .patch(aboutHistoryUpload.single('image_url'), async (req, res, next) => {
        try {
            const history = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'history' } }
            );

            const about_tave_image = await Image.update(
                {
                    image_url: req.file.location,
                    image_description: req.body.image_description,
                },
                { where: { board_id: history } }

            ); 
            res.status(201).json({ history });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .delete(async (req, res, next) => {
        try {
    
            const history = await Board.destroy({
                where: { category: 'history' },
            });
            const history_image = await Image.destroy({
                where: { board_id: history },
            });
            res.status(200).json(true);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/history:
 *      get:
 *          tags: [history]
 *          summary: 테이브 연혁 조회
 *          description: TAVE 연혁 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: TAVE 연혁 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      post:
 *          tags: [history]
 *          summary: 테이브 연혁 작성
 *          description: TAVE 연혁 작성
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 연혁 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 연혁 내용
 *          - in: formData
 *            name: "image_key"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이미지 경로
 *          - in: formData
 *            name: "image_url"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이미지 경로
 *          - in: formData
 *            name: "image_description"
 *            required: false
 *            schema:
 *                type: string
 *                description: 이미지 설명
 *          responses:
 *              201:
 *                  description: TAVE 연혁 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *
 *      patch:
 *          tags: [history]
 *          summary: 테이브 연혁 수정
 *          description: TAVE 연혁 수정
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 연혁 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 연혁 내용
 *          - in: formData
 *            name: "images"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이미지 경로
 *          - in: formData
 *            name: "image_description"
 *            required: false
 *            schema:
 *                type: string
 *                description: 이미지 설명
 *          responses:
 *              201:
 *                  description: TAVE 연혁지 수정 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      delete:
 *          tags: [history]
 *          summary: 테이브 연혁 삭제
 *          description: TAVE 연혁 삭제
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: TAVE 연혁 삭제 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 */

module.exports = router;
