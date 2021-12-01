const Sequelize = require('sequelize');

module.exports = class Image extends (
    Sequelize.Model
) {
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
                underscored: true,
                modelName: 'Image',
                tableName: 'images',
                paranoid: true,
                timestamps: true,
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
