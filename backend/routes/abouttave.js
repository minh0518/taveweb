const express = require('express');
const logger = require('../config/winston');

const { s3, newsUpload } = require('../config/s3');
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
            const about_tave = await Board.findOne({
                include: [
                    {
                        model: Image,
                        //attributes: ['image_key','image_url', 'image_description'],
                    },
                ],
                attributes: ['title', 'content'],
                where: { category: 'about_tave' },
            });
            res.status(200).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(aboutTaveUpload.array('images'), async (req, res, next) => {
        try {
            const about_tave = await Board.create({
                category: 'about_tave',
                title: req.body.title,
                content: req.body.content,
            });

            img_desc_json = JSON.parse(req.body.image_description);

            //logger.debug('req.file:' + req.file);
            logger.debug(JSON.stringify(req.body));
            //logger.debug(JSON.stringify(req.data));
            logger.debug('req.files:' + req.files);
            //logger.debug('req.images:' + req.images);
            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const about_tave_image = await Image.create({
                        image_key: file.key,
                        image_url: file.location,
                        image_description: img_desc_json[file.originalname],
                        board_id: about_tave.id,
                    });
                })
            );
            res.status(201).json({ about_tave });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .patch(aboutTaveUpload.array('images'), async (req, res, next) => {
        try {
            const about_tave_update = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'about_tave' } }
            );

            const about_tave = await Board.findOne({
                where: { category: 'about_tave' },
            });

            img_desc_json = JSON.parse(req.body.image_description);

            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const about_tave_image = await Image.update(
                        {
                            image_key: file.key,
                            image_url: file.location,
                            image_description: img_desc_json[file.originalname],
                        },
                        { where: { board_id: about_tave.id } }
                    );
                })
            );
            res.status(201).json({ about_tave_update });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })

    .delete(async (req, res, next) => {
        try {
            const about_tave = await Board.destroy({
                where: { category: 'about_tave' },
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

router
    .route('/image/:id')
    .patch(aboutTaveUpload.single('image'), async (req, res, next) => {
        try {
            logger.debug(JSON.stringify(req.file));

            const payload = {};

            /* 1. 이미지가 있는지 확인 */
            if (req.file) {
                payload['image_key'] = req.file.key;
                payload['image_url'] = req.file.location;

                const image = await Image.findOne({
                    attributes: ['image_key'],
                    where: { id: req.params.id },
                });

                /* 2. 삭제 폼 작성 */
                let Objects = [];
                Objects.push({ Key: image['image_key'] });

                var params = {
                    Bucket: 'tave-bucket',
                    Delete: { Objects },
                };

                /* 3. 삭제 요청 */
                if (Objects.length !== 0) {
                    // 빈 배열이 아닐때만
                    s3.deleteObjects(params, function (err, data) {
                        if (err) console.log(err, err.stack);
                        else console.log(data);
                    });
                }
            }

            if (req.body.image_description)
                payload['image_description'] = req.body.image_description;

            const success = await Image.update(payload, {
                where: { id: req.params.id },
            });

            res.status(200).json(payload);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            /* 1. 불러오기 */
            const image = await Image.findOne({
                attributes: ['image_key'],
                where: { id: req.params.id },
            });

            /* 2. 삭제 폼 작성 */
            let Objects = [];
            Objects.push({ Key: image['image_key'] });

            var params = {
                Bucket: 'tave-bucket',
                Delete: { Objects },
            };

            /* 3. 삭제 요청 */
            if (Objects.length !== 0) {
                // 빈 배열이 아닐때만
                s3.deleteObjects(params, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else console.log(data);
                });
            }

            const success = await Image.destroy({
                where: { id: req.params.id },
            });

            res.status(200).json({ success });
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
