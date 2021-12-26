const express = require('express');
const logger = require('../config/winston');

const Recruit = require('../models/recruit');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const recruits = await Recruit.findAll({
                attributes: ['id', 'title', 'generation', 'recruit_form'],
            });
            res.status(200).json({ recruits });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const recruit = await Recruit.create({
                title: req.body.title,
                generation: req.body.generation,
                recruit_form: req.body.recruit_form,
            });
            logger.debug(recruit);
            res.status(201).json(recruit);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/recruit:
 *      get:
 *          tags: [recruit]
 *          summary: 지원서 조회
 *          description: 지원서 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 지원서 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Recruit'
 *      post:
 *          tags: [recruit]
 *          summary:  지원서 작성
 *          description: 지원서 작성
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: body
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: 제목
 *          - in: body
 *            name: "generation"
 *            required: true
 *            schema:
 *                type: string
 *                description: 기수
 *          - in: body
 *            name: "recruit_form"
 *            required: true
 *            schema:
 *                type: json
 *                description: 지원서 폼
 *          responses:
 *              201:
 *                  description: 지원서 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Recruit'
 */

module.exports = router;
