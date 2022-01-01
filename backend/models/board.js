const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                category: {
                    type: Sequelize.ENUM,
                    values: [
                        'about_tave',
                        'about_history',
                        'about_admin',
                        'notice',
                        'news',
                        'activity_review',
                        'activity_picture',
                    ],
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
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Board',
                tableName: 'boards',
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
        db.Board.hasMany(db.Image, {
            foreignKey: 'board_id',
            targetKey: 'id',
        });
    }
};
