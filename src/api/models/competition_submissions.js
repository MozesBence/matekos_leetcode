const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Competitionsubmissions extends Model {}

    Competitionsubmissions.init(
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
            modelName: 'Competitionsubmissions',
            tableName: 'competition_submissions',
            timestamps: true,
        }
    );

    return Competitionsubmissions;
};
