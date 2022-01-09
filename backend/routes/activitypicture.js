const express = require('express');
const logger = require('../config/winston');

const { s3, activityPictureUpload } = require('../config/s3');
const path = require('path');
const fs = require('fs');
const url = require('url');

const Board = require('../models/board');
const { json } = require('body-parser');
const Image = require('../models/image');
const { Op } = require('sequelize');

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
        try {
            const activity_picture = await Board.findAll({
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
                where: { category: 'activity_picture' },
                offset: Number(req.query.skip),
                limit: Number(req.query.limit),
            });
            res.status(200).json({ activity_picture });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .post(activityPictureUpload.array('images'), async (req, res, next) => {
        try {
            const activity_picture = await Board.create({
                category: 'activity_picture',
                title: req.body.title,
                content: req.body.content,
            });

            img_desc_json = JSON.parse(req.body.image_description);

            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const activity_picture_image = await Image.create({
                        image_key: file.key,
                        image_url: file.location,
                        image_description: img_desc_json[file.originalname],
                        board_id: activity_picture.id,
                    });
                })
            );

            res.status(201).json({ activity_picture });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router.route('/count').get(async (req, res, next) => {
    logger.debug(req.query.search);
    const title = req.query.search ? req.query.search : '';
    try {
        const count = await Board.count({
            where: {
                category: 'activity_picture',
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
            const activity_picture = await Board.findOne({
                include: [
                    {
                        model: Image,
                    },
                ],
                attributes: ['id', 'title', 'content', 'created_at'],
                where: { id: req.params.id },
            });
            res.status(200).json({ activity_picture });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .patch(activityPictureUpload.array('images'), async (req, res, next) => {
        try {
            const activity_picture = await Board.update(
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { where: { id: req.params.id } }
            );

            img_desc_json = JSON.parse(req.body.image_description);

            logger.debug(JSON.stringify(req.files));

            await Promise.all(
                req.files.map(async (file) => {
                    logger.debug(file);
                    const activity_picture_image = await Image.update(
                        {
                            image_key: file.key,
                            image_url: file.location,
                            image_description: img_desc_json[file.originalname],
                        },
                        { where: { board_id: req.params.id } }
                    );
                })
            );
            res.status(201).json({ activity_picture });
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
            const activity_picture = await Board.destroy({
                where: { category: 'activity_picture', id: req.params.id },
            });
            const activity_picture_image = await Image.destroy({
                where: { board_id: req.params.id },
            });
            res.status(200).json({ success: true });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

router
    .route('/image/:id')
    .patch(activityPictureUpload.single('image'), async (req, res, next) => {
        try {
            logger.debug(JSON.stringify(req.file));

            const payload = {};

            /* 1. 이미지가 있는지 확인 */
            if (req.file) {
                payload['image_key'] = req.file.key;
                payload['image_url'] = req.file.location;

                const image = await Image.findOne({
                    attributes: ['image_key'],
                    where: { id: req.params.id },
                });

                /* 2. 삭제 폼 작성 */
                let Objects = [];
                Objects.push({ Key: image['image_key'] });

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
            }

            if (req.body.image_description)
                payload['image_description'] = req.body.image_description;

            const success = await Image.update(payload, {
                where: { id: req.params.id },
            });

            res.status(200).json(payload);
        } catch (err) {
            logger.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            /* 1. 불러오기 */
            const image = await Image.findOne({
                attributes: ['image_key'],
                where: { id: req.params.id },
            });

            /* 2. 삭제 폼 작성 */
            let Objects = [];
            Objects.push({ Key: image['image_key'] });

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

            const success = await Image.destroy({
                where: { id: req.params.id },
            });

            res.status(200).json({ success });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    });

module.exports = router;
