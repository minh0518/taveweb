const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const db = require('./db');

const { sequelize } = require('./models');
// const indexRouter = require('./routes');
// const usersRouter = require('./routes/users');
// const commentsRouter = require('./routes/comments');

const app = express();
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.pool.query(
    `CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`,
    (err, results, fileds) => {
        console.log('results', results);
        // console.log('err', err);
        // console.log('fileds', fileds);
    }
);

app.get('/api/hi', function (req, res) {
    res.status(200).send('good');
});

app.get('/api/values', function (req, res) {
    db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
        if (err) return res.status(500).send(err);
        else return res.json(results);
    });
});

app.post('/api/value', function (req, res, next) {
    //데이터베이스에 값 넣어주기
    db.pool.query(
        `INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err) return res.status(500).send(err);
            else return res.json({ success: true, value: req.body.value });
        }
    );
});

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
});
