const express = require('express');
const logger = require('../config/winston');
const s3 = require('../config/s3');
const { userUpload } = require('../config/s3');

const path = require('path');
const fs = require('fs');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    logger.warn('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename(req, file, cb) {
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.findAll({
            // attributes: ['id', 'title', 'content'],
        });
        res.json({ users });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router.post('/', userUpload.single('profile'), async (req, res, next) => {
    try {
        //logger.debug(req.file.location);
        // logger.debug(req.body.email);
        // logger.debug(req.body.password);
        // logger.debug(req.body.name);
        hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role: 'normal',
            profile: req.file.location,
        });
        logger.debug(user);
        res.status(201).json({ user });
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
            const question = await Question.findOne({
                include: [
                    {
                        model: Answer,
                    },
                ],
                attributes: ['id', 'title', 'content'],
                where: { id: req.params.id },
            });
            res.status(200).json({ question });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await Question.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await Question.destroy({
                where: { id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/:id/password').get(async (req, res, next) => {
    try {
        const question = await Question.findOne({
            where: { id: req.params.id, password: req.body.password },
        });
        res.status(200).json({ check: question !== null });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

/**
 * @swagger
 * paths:
 *  /api/users:
 *      get:
 *          tags: [users]
 *          summary: users 조회
 *          description: users 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: users 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      post:
 *          tags: [users]
 *          summary: user 추가
 *          description: user 추가
 *          consumes:
 *          - multipart/form-data
 *          parameters:
 *          - in: formData
 *            name: "emial"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이메일
 *          - in: formData
 *            name: "password"
 *            required: true
 *            schema:
 *                type: string
 *                description: 비밀번호
 *          - in: formData
 *            name: "name"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이름
 *          - in: formData
 *            name: "profile"
 *            required: true
 *            schema:
 *                type: string
 *                description: 프로필
 *          responses:
 *              201:
 *                  description: user 추가 성공
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 */

module.exports = router;
