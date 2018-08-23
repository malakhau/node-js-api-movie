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
        },
        rated: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        released: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        runtime: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        genre: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        director: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        writer: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        actors: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        plot: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        language: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        awards: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        poster: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        metascore: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imdbRating: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imdbVotes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imdbID: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        boxOffice: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        production: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        website: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Movie.associate = models => {
        Movie.hasMany(models.comment);
    };

    return Movie;
};
