const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                image_url: {
                    type: Sequelize.STRING(500),
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
                modelName: 'Image',
                tableName: 'images',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Image.belongsTo(db.Board, {
            foreignKey: 'board_id',
            targetKey: 'id',
        });
    }
};
