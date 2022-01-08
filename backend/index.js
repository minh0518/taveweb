const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const logger = require('./config/winston');
const { swaggerUi, specs } = require('./config/swagger');

const indexRouter = require('./routes');

const app = express();
sequelize
    .sync({ force: false, alter: false })
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', indexRouter);

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
    logger.debug('logger 테스트');
    // logger.info('info');
    // logger.warn('warn');
    // logger.error('error');
});
