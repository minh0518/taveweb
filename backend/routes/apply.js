const express = require('express');
const logger = require('../config/winston');

const Applies = require('../models/apply');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const applies = await Applies.findAll({
                attributes: ['id', 'phone', 'name', 'email', 'apply_form'],
            });
            res.status(200).json({ applies });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const apply = await Applies.create({
                phone: req.body.phone,
                name: req.body.name,
                email: req.body.email,
                apply_form: req.body.apply_form,
            });
            logger.debug(apply);
            res.status(201).json(apply);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/apply:
 *      get:
 *          tags: [apply]
 *          summary: 지원서 조회
 *          description: 지원서 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 지원서 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Apply'
 *      post:
 *          tags: [apply]
 *          summary:  지원서 작성
 *          description: 지원서 작성
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: body
 *            name: "phone"
 *            required: true
 *            schema:
 *                type: string
 *                description: 전화번호
 *          - in: body
 *            name: "name"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이름
 *          - in: body
 *            name: "email"
 *            required: true
 *            schema:
 *                type: string
 *                description: 이메일
 *          - in: body
 *            name: "apply_form"
 *            required: true
 *            schema:
 *                type: json
 *                description: 지원서 폼
 *          responses:
 *              201:
 *                  description: 지원서 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Apply'
 */

module.exports = router;
