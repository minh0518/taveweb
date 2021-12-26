const express = require('express');
const logger = require('../config/winston');

const { s3, noticeUpload } = require('../config/s3');

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
        // logger.debug(req.query.skip);
        // logger.debug(req.query.limit);
        try {
            const notices = await Board.findAll({
                attributes: ['id', 'title', 'content', 'created_at'],
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
                where: { category: 'notice' },
                offset: Number(req.query.skip),
                limit: Number(req.query.limit),
            });
            res.status(200).json({ notices });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(noticeUpload.array('images'), async (req, res, next) => {
        try {
            const notice = await Board.create({
                category: 'notice',
                title: req.body.title,
                content: req.body.content,
            });

            img_desc_json = JSON.parse(req.body.image_description);

            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const notice_image = await Image.create({
                        image_key: file.key,
                        image_url: file.location,
                        image_description: img_desc_json[file.originalname],
                        board_id: notice.id,
                    });
                })
            );

            res.status(201).json({ notice });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const notice = await Board.findOne({
                include: [
                    {
                        model: Image,
                        //attributes: ['image_key','image_url', 'image_description'],
                    },
                ],
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at',
                    'updated_at',
                ],
                where: { id: req.params.id },
            });
            res.status(200).json({ notice });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(noticeUpload.single('image_url'), async (req, res, next) => {
        try {
            const notice = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { category: 'notice' } }
            );

            const notice_image = await Image.update(
                {
                    image_url: req.file.location,
                    image_description: req.body.image_description,
                },
                { where: { board_id: notice } }
            );
            res.status(201).json({ notice });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);

            /* 1. 일단 board_id에 대한 이미지 전체 조회 */
            const images = await Image.findAll({
                attributes: [
                    'id',
                    'image_key',
                    'image_url',
                    'image_description',
                ],
                where: { board_id: req.params.id },
            });

            /* 2. 삭제 폼 작성 */
            let Objects = [];
            images.map((image) => Objects.push({ Key: image['image_key'] }));
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

            /* 4. 이미지 삭제가 완료 되면 db 데이터 삭제 */
            const notice = await Board.destroy({
                where: { category: 'notice' },
            });
            const notice_image = await Image.destroy({
                where: { board_id: notice },
            });
            res.status(200).json({ success: true });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/notices:
 *      get:
 *          tags: [notices]
 *          summary: 공지 페이지 조회
 *          description: 전체 공지사항 조회
 *          parameters:
 *          - in: query string
 *            name: "skip"
 *            required: true
 *            schema:
 *                type: int
 *                description: 시작 위치
 *          - in: query string
 *            name: "limit"
 *            required: true
 *            schema:
 *                type: int
 *                description: 조회할 개수
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 공지 페이지 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      post:
 *          tags: [notices]
 *          summary: 공지 작성
 *          description: 공지 작성
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 공지 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 공지 내용
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
 *                  description: 공지 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *  /api/notices/{id}:
 *      get:
 *          tags: [notices]
 *          summary: 공지 상세 조회
 *          description: 공지 상세 조회
 *          produces:
 *          - application/json
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: 공지 상세 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      patch:
 *          tags: [notices]
 *          summary: 공지 수정
 *          description: 공지 수정
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          - in: formData
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 공지 제목
 *          - in: formData
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 공지 내용
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
 *                  description: 공지 수정 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 *      delete:
 *          tags: [notices]
 *          summary: 공지 삭제
 *          description: 공지 삭제
 *          produces:
 *          - application/json
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: 공지 삭제 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Board'
 */

module.exports = router;
