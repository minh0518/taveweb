const express = require('express');
const logger = require('../config/winston');

const FaQ = require('../models/faq');
const { Op } = require('sequelize');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const faqs = await FaQ.findAll({
                attributes: ['id', 'title', 'question', 'created_at'],
            });
            res.json({ faqs });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const faq = await FaQ.create({
                title: req.body.title,
                question: req.body.question,
                answer: req.body.answer,
            });
            logger.debug(faq);
            res.status(201).json(faq);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/count').get(async (req, res, next) => {
    logger.debug(req.query.search);
    const title = req.query.search ? req.query.search : '';
    try {
        const count = await FaQ.count({
            where: {
                title: { [Op.like]: `%${title}%` },
            },
        });
        res.status(200).json({ count });
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
            const faq = await FaQ.findOne({
                attributes: ['id', 'title', 'question', 'answer', 'created_at'],
                where: { id: req.params.id },
            });
            res.status(200).json({ faq });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const faq = await FaQ.update(
                {
                    title: req.body.title,
                    question: req.body.question,
                    answer: req.body.answer,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ faq });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.debug(req.params.id);
            const result = await FaQ.destroy({
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/faqs:
 *      get:
 *          tags: [faqs]
 *          summary: FAQ 전체 조회
 *          description: FAQ 전체 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 전체 FAQ조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Faq'
 *      post:
 *          tags: [faqs]
 *          summary: FAQ 작성
 *          description: FAQ 작성
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: body
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: FAQ 제목
 *          - in: body
 *            name: "question"
 *            required: true
 *            schema:
 *                type: string
 *                description: 질문 내용
 *          - in: body
 *            name: "answer"
 *            required: true
 *            schema:
 *                type: string
 *                description: 답변 내용
 *          responses:
 *              201:
 *                  description: FAQ 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Faq'
 *  /api/faqs/{id}:
 *      get:
 *          tags: [faqs]
 *          summary: FAQ 상세 조회
 *          description: FAQ 상세 조회
 *          produces:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: FAQ 상세 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Faq'
 *      patch:
 *          tags: [faqs]
 *          summary: FAQ 수정
 *          description: FAQ 수정
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "title"
 *            required: true
 *            schema:
 *                type: string
 *                description: FAQ 제목
 *          - in: body
 *            name: "question"
 *            required: true
 *            schema:
 *                type: string
 *                description: 질문 내용
 *          - in: body
 *            name: "answer"
 *            required: true
 *            schema:
 *                type: string
 *                description: 답변 내용
 *          responses:
 *              201:
 *                  description: FAQ 수정 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Faq'
 *      delete:
 *          tags: [faqs]
 *          summary: FAQ 삭제
 *          description: FAQ 삭제
 *          produces:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          responses:
 *              200:
 *                  description: FAQ 삭제 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Faq'
 */

module.exports = router;
