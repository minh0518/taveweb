const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                category: {
                    type: Sequelize.ENUM,
                    values: ['notice', 'news', 'faq'],
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                question: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                answer: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'Board',
                tableName: 'boards',
                paranoid: true,
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
        db.Board.hasMany(db.Image, {
            foreignKey: 'board_id',
            targetKey: 'id',
        });
    }
};
