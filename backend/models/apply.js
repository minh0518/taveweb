const Sequelize = require('sequelize');

module.exports = class Apply extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                phone: {
                    type: Sequelize.STRING(500),
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                apply_form: {
                    type: Sequelize.JSON,
                    allowNull: false,
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
                modelName: 'Applies',
                tableName: 'applies',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Apply.belongsTo(db.Recruit, {
            foreignKey: 'recruit_id',
            targetKey: 'id',
        });
    }
};
