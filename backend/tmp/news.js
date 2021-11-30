const Sequelize = require('sequelize');

module.exports = class News extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.STRING(500),
                    allowNull: false,
                },
                // del_flag: {
                //     type: Sequelize.BOOLEAN,
                //     allowNull: false,
                // },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'News',
                tableName: 'news',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.News.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    }
};
