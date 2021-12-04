const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Question',
                tableName: 'questions',
                paranoid: true,
                timestamps: true,
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
