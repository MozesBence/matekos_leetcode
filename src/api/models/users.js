const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {}

    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.CHAR(60),
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING(40),
                allowNull: false,
                unique: true,
            },
            user_role: {
                type: DataTypes.CHAR(15),
                defaultValue: "member",
            },
            experience_point: {
                type: DataTypes.BIGINT,
                defaultValue: 0,
            },
            currency_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            roll_back_token:{
                type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            join_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            activated: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 0,
                    max: 2,
                },
                defaultValue: 0,
            },
            
            streak: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            max_streak:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            }
            
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'users',
            timestamps: false,
        }
    );

    return Users;
};
