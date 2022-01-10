const express = require('express');
const logger = require('../config/winston');

const Recruit = require('../models/recruit');
const { Op } = require('sequelize');

const router = express.Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const recruits = await Recruit.findAll({
                attributes: ['id', 'title', 'generation', 'recruit_form'],
                offset: Number(req.query.skip),
                limit: Number(req.query.limit),
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

router.route('/count').get(async (req, res, next) => {
    logger.debug(req.query.search);
    const title = req.query.search ? req.query.search : '';
    try {
        const count = await Recruit.count({
            where: { title: { [Op.like]: `%${title}%` } },
        });
        res.status(200).json({ count });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router.route('/:id').get(async (req, res, next) => {
    try {
        logger.debug(req.params.id);
        const recruit = await Recruit.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json({ recruit });
    } catch (err) {
        logger.error(err);
        next(err);
    }
});
// .patch(async (req, res, next) => {
//     try {
//         const payload = {};

//         if (req.body.title) payload['title'] = req.body.title;
//         if (req.body.content) payload['generation'] = req.body.content;
//         if (req.body.content) payload['content'] = req.body.content;

//         logger.debug(JSON.stringify(payload));

//         const recruit = await Recruit.update(payload, {
//             where: { id: req.params.id },
//         });

//         res.status(201).json(payload);
//     } catch (err) {
//         logger.error(err);
//         next(err);
//     }
// })
// .delete(async (req, res, next) => {
//     try {
//         logger.debug(req.params.id);

//         /* 1. 일단 board_id에 대한 이미지 전체 조회 */
//         const images = await Image.findAll({
//             attributes: [
//                 'id',
//                 'image_key',
//                 'image_url',
//                 'image_description',
//             ],
//             where: { board_id: req.params.id },
//         });

//         /* 2. 삭제 폼 작성 */
//         let Objects = [];
//         images.map((image) => Objects.push({ Key: image['image_key'] }));
//         var params = {
//             Bucket: 'tave-bucket',
//             Delete: { Objects },
//         };

//         /* 3. 삭제 요청 */
//         if (Objects.length !== 0) {
//             // 빈 배열이 아닐때만
//             s3.deleteObjects(params, function (err, data) {
//                 if (err) console.log(err, err.stack);
//                 else console.log(data);
//             });
//         }

//         /* 4. 이미지 삭제가 완료 되면 db 데이터 삭제 */
//         const notice = await Board.destroy({
//             where: { category: 'notice', id: req.params.id },
//         });
//         const notice_image = await Image.destroy({
//             where: { board_id: req.params.id },
//         });
//         res.status(200).json({ success: true });
//     } catch (err) {
//         logger.error(err);
//         next(err);
//     }
// });

/**
 * @swagger
 * paths:
 *  /api/recruit:
 *      get:
 *          tags: [recruit]
 *          summary: 지원서 양식 조회
 *          description: 지원서 양식 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 지원서 양식 조회 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Recruit'
 *      post:
 *          tags: [recruit]
 *          summary:  지원서 양식 작성
 *          description: 지원서 양식 작성
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
 *                  description: 지원서 양식 작성 성공
 *                  schema:
 *                      $ref: '#/components/schemas/Recruit'
 */

module.exports = router;
