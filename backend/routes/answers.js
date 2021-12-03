const express = require('express');
const Answer = require('../models/answer');
// const { Comment } = require('../models');

const router = express.Router();

//디비 확인용 라우터
router.get('/', async (req, res, next) => {
    try {
        const answers = await Answer.findAll({
            attributes: ['id', 'content', 'question_id'],
        });
        res.status(200).json({ answers });
    } catch (error) {
        console.error(err);
        next(err);
    }
});

// question_id랑 연결되어있기 때문에 question_id에 해당되는 질문이 없으면 오류남.

router
    .route('/:id') //여기서 id는 question_id,,, 이렇게 해도 되나 모르겠음
    .post(async (req, res, next) => {
        try {
            console.log(req.params.id);
            const answer = await Answer.create({
                content: req.body.content,
                question_id: req.params.id,
            });
            //console.log(answer);
            res.status(201).json(answer);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

    .patch(async (req, res, next) => {
        try {
            const answer = await Answer.update(
                {
                    content: req.body.content,
                },
                {
                    where: { question_id: req.params.id },
                }
            );
            res.json({ answer });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

    .delete(async (req, res, next) => {
        try {
            const result = await Answer.destroy({
                where: { question_id: req.params.id },
            });
            res.json({ result });
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// router.post('/', async (req, res, next) => {
//     try {
//         const comment = await Comment.create({
//             commenter: req.body.id,
//             comment: req.body.comment,
//         });
//         console.log(comment);
//         res.status(201).json(comment);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router
//     .route('/:id')
//     .patch(async (req, res, next) => {
//         try {
//             const result = await Comment.update(
//                 {
//                     comment: req.body.comment,
//                 },
//                 {
//                     where: { id: req.params.id },
//                 }
//             );
//             res.json(result);
//         } catch (err) {
//             console.error(err);
//             next(err);
//         }
//     })
//     .delete(async (req, res, next) => {
//         try {
//             const result = await Comment.destroy({
//                 where: { id: req.params.id },
//             });
//             res.json(result);
//         } catch (err) {
//             console.error(err);
//             next(err);
//         }
//     });

module.exports = router;
