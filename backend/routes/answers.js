const express = require('express');
const Answer = require('../models/answer');
// const { Comment } = require('../models');

const router = express.Router();

// router.get('/', async (req, res, next) => {
//     try {
//         const answers = await Answer.findAll({
//             attributes: ['id', 'content', 'question_id'],
//         });
//         res.status(200).json({ answers });
//     } catch (error) {
//         console.error(err);
//         next(err);
//     }
// });

// router.post('/:id', async (req, res, next) => {
//     try {
//         console.log(req.params.id);
//         const answer = await Answer.create({
//             content: req.body.content,
//             question_id: req.params.id,
//         });
//         console.log(answer);
//         res.status(201).json(answer);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.delete('/:id', async (req,res,next)=>{
//     try{
//         const
//     }
// })

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
