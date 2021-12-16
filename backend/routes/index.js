const express = require('express');

const usersRouter = require('./users');
const questionsRouter = require('./questions');
const answersRouter = require('./answers');
const testsRouter = require('./test');
const faqsRouter = require('./faqs');
const abouttaveRouter = require('./about_tave');
const db = require('../config/db');

const router = express.Router();

/* 라우터 등록 */
router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/test', testsRouter);
router.use('/faqs', faqsRouter);
router.use('/about_tave', abouttaveRouter);

router.get('/', async (req, res, next) => {
    try {
        res.json({ 'This is': 'Tave official homepage' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/hi', function (req, res) {
    res.status(200).send('good');
});

router.get('/values', function (req, res) {
    db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
        if (err) return res.status(500).send(err);
        else return res.json(results);
    });
});

router.post('/value', function (req, res, next) {
    db.pool.query(
        `INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err) return res.status(500).send(err);
            else return res.json({ success: true, value: req.body.value });
        }
    );
});

module.exports = router;
