const Sequelize = require('sequelize');

module.exports = class Users extends (
    Sequelize.Model
) {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                role: {
                    type: Sequelize.ENUM,
                    values: [
                        'master',
                        'chairman',
                        'business-head',
                        'pr',
                        'accounting',
                        'tech-head',
                        'tech',
                        'normal',
                    ],
                    allowNull: false,
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
            targetKey: 'id',
        });
        db.User.hasMany(db.FaQ, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        db.User.hasMany(db.Recruit, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    }
};
