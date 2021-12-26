const express = require('express');
const logger = require('../config/winston');

const Answer = require('../models/answer');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const answers = await Answer.findAll({
                attributes: ['id', 'content', 'question_id'],
            });
            res.status(200).json({ answers });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            logger.debug(req.body.question_id);
            const answer = await Answer.create({
                content: req.body.content,
                question_id: req.body.question_id,
            });
            res.status(201).json(answer);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router
    .route('/:id')
    .patch(async (req, res, next) => {
        try {
            const answer = await Answer.update(
                {
                    content: req.body.content,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json({ answer });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Answer.destroy({
                where: { id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

/**
 * @swagger
 * paths:
 *  /api/answers:
 *      get:
 *          tags: [answers]
 *          summary: Q&A 답변 전체 조회
 *          description: Q&A 답변 전체 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 전체 답변 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Answer'
 *      post:
 *          tags: [answers]
 *          summary: Q&A 답변 작성
 *          description: Q&A 답변 작성
 *          produces:
 *          - application/json
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: body
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 답변 내용
 *          - in: body
 *            name: "question_id"
 *            required: true
 *            schema:
 *                type: string
 *                description: 답변할 질문 id
 *          responses:
 *              201:
 *                  description: 답변 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Answer'
 *  /api/answers/{id}:
 *      patch:
 *          tags: [answers]
 *          summary: Q&A 답변 수정
 *          description: Q&A 답변 수정
 *          consumes:
 *          - application/json
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "content"
 *            required: true
 *            schema:
 *                type: string
 *                description: 답변 내용
 *          responses:
 *              201:
 *                  description: 답변 수정 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Answer'
 *      delete:
 *          tags: [answers]
 *          summary: Q&A 답변 삭제
 *          description: Q&A 답변 삭제
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
 *                  description: 답변 삭제 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Answer'
 */

module.exports = router;
