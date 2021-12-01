const Sequelize = require('sequelize');

module.exports = class Json extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Json',
                tableName: 'jsons',
                paranoid: false,
                timestamps: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
};
