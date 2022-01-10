const express = require('express');

const usersRouter = require('./users');
const questionsRouter = require('./questions');
const answersRouter = require('./answers');
const testsRouter = require('./test');
const faqsRouter = require('./faqs');
const applyRouter = require('./apply');
const recruitRouter = require('./recruit');
const abouttaveRouter = require('./abouttave');
const historyRouter = require('./abouthistory');
const newsRouter = require('./news');
const noticeRouter = require('./notice');
const activityreviewRouter = require('./activityreview');
const activitypictureRouter = require('./activitypicture');
const aboutadminRouter = require('./aboutadmin');
const db = require('../config/db');

const router = express.Router();

/* 라우터 등록 */
router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/test', testsRouter);
router.use('/faqs', faqsRouter);
router.use('/applies', applyRouter);
router.use('/recruits', recruitRouter);
router.use('/about/tave', abouttaveRouter);
router.use('/about/history', historyRouter);
router.use('/news', newsRouter);
router.use('/notices', noticeRouter);
router.use('/activity/review', activityreviewRouter);
router.use('/activity/picture', activitypictureRouter);
router.use('/about/admin', aboutadminRouter);

router.get('/', async (req, res, next) => {
    try {
        res.json({ 'This is': 'Tave official homepage' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
