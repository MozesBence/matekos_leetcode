const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CompetitionAttendees extends Model {}

    CompetitionAttendees.init(
        {
            Userid: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            competition_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'competitions',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'CompetitionAttendees',
            tableName: 'competition_attendees',
            timestamps: true,
        }
    );

    return CompetitionAttendees;
};
