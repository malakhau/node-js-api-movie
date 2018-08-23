module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('movie', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING('128'),
            allowNull: false,
            unique: true
        },
        plot: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Movie.associate = models => {
        Movie.hasMany(models.comment);
    };

    return Movie;
};
