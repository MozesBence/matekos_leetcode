const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CompetitionSubmissions extends Model {}

    CompetitionSubmissions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            experience_level: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'CompetitionSubmissions',
            tableName: 'competition_submissions',
            timestamps: true,
        }
    );

    return CompetitionSubmissions;
};
