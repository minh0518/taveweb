const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        components: {},
        info: {
            title: 'Tave-Web API',
            verssion: '1.0.0',
            description: 'Tave-Web API with express',
        },
        //host: 'localhost:3300',
        //basePath: '/',
        //schemas: ['http'],
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js', './swagger/*'],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
