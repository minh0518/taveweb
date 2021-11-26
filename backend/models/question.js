const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                del_flag: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
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
                modelName: 'Question',
                tableName: 'questions',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Question.hasMany(db.Answer, {
            foreignKey: 'question_id',
            sourceKey: 'id',
        });
    }
};
