const Sequelize = require('sequelize');

module.exports = class FaQ extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                question: {
                    type: Sequelize.STRING(500),
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.STRING(500),
                    allowNull: false,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'FaQ',
                tableName: 'faqs',
                paranoid: false,
                timestamps: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Board.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    }
};
