const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                image_url: {
                    type: Sequelize.STRING(500),
                    allowNull: false,
                },
                image_description: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
            },
            {
                sequelize,
                underscored: true,
                modelName: 'Image',
                tableName: 'images',
                paranoid: false,
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
