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
const { Op } = require('sequelize');

const User = require('../models/user');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    logger.warn('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'created_at'],
            offset: Number(req.query.skip),
            limit: Number(req.query.limit),
        });

        res.json({ users });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role: 'normal',
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
            const user = await User.findOne({
                attributes: [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'role',
                    'password',
                ],
                where: { id: req.params.id },
            });
            res.status(200).json({ user });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const payload = {};

            if (req.body.name) payload['name'] = req.body.name;
            if (req.body.email) payload['email'] = req.body.email;
            if (req.body.profile) payload['profile'] = req.body.profile;
            if (req.body.password) payload['password'] = req.body.password;
            if (req.body.role) payload['role'] = req.body.role;

            logger.debug(JSON.stringify(payload));

            const notice = await User.update(payload, {
                where: { id: req.params.id },
            });

            res.status(201).json(payload);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await User.destroy({
                where: { id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/count').get(async (req, res, next) => {
    logger.debug(req.query.search);
    const name = req.query.search ? req.query.search : '';
    try {
        const count = await User.count({
            where: { name: { [Op.like]: `%${name}%` } },
        });
        res.status(200).json({ count });
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
