module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING('128'),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = models => {
        Comment.belongsTo(models.movie, {
            allowNull: false,
            onDelete: 'CASCADE'
        });
    };

    return Comment;
};
