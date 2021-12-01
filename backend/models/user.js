const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                profile: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                role: {
                    type: Sequelize.STRING(20),
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
                underscored: true,
                modelName: 'Users',
                tableName: 'users',
                paranoid: true,
                timestamps: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Board, {
            foreignKey: 'user_id',
            sourceKey: 'id',
        });
        db.User.hasMany(db.FaQ, {
            foreignKey: 'user_id',
            sourceKey: 'id',
        });
        db.User.hasMany(db.Recruit, {
            foreignKey: 'user_id',
            sourceKey: 'id',
        });
    }
};
