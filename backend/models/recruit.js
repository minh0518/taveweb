const Sequelize = require('sequelize');

module.exports = class Recruit extends (
    Sequelize.Model
) {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                generation: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                recruit_form: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Recruit',
                tableName: 'recruits',
                paranoid: false,
                timestamps: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Recruit.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        db.Recruit.hasMany(db.Apply, {
            foreignKey: 'recruit_id',
            targetKey: 'id',
        });
    }
};
