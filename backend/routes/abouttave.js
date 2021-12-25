const express = require('express');
const logger = require('../config/winston');

const s3 = require('../config/s3');
const { aboutTaveUpload } = require('../config/s3');
const path = require('path');
const fs = require('fs');

const Board = require('../models/board');
const { json } = require('body-parser');
const Image = require('../models/image');
const swagger = require('../config/swagger');

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

/**
 * @swagger
 * paths:
 *  /api/about/tave:
 *      get:
 *          tags: [about-tave]
 *          summary: 테이브 소개 조회
 *          description: TAVE 소개 페이지 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: TAVE 소개 페이지 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      post:
 *          tags: [about-tave]
 *          summary: 테이브 소개 작성
 *          description: TAVE 소개 페이지 작성
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 소개 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 소개 내용
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
 *                  description: TAVE 소개 페이지 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *
 *      patch:
 *          tags: [about-tave]
 *          summary: 테이브 소개 수정
 *          description: TAVE 소개 페이지 수정
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 소개 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 테이브 소개 내용
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
 *                  description: TAVE 소개 페이지 수정 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      delete:
 *          tags: [about-tave]
 *          summary: 테이브 소개 삭제
 *          description: TAVE 소개 페이지 삭제
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: TAVE 소개 페이지 삭제 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 */
