const Sequelize = require('sequelize');

module.exports = class Answer extends (
    Sequelize.Model
) {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Answer',
                tableName: 'answers',
                paranoid: true,
                timestamps: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Answer.belongsTo(db.Question, {
            foreignKey: 'question_id',
            targetKey: 'id',
        });
        db.Answer.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    }
};
