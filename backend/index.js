const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');


const { sequelize } = require('./models');
const indexRouter = require('./routes');

const app = express();
sequelize
    .sync({ force: true })
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


app.use('/api', indexRouter);

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
});
