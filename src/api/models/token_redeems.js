const {Model} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    class TokenRedeems extends Model {}

    TokenRedeems.init({
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        task_id: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        submission_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        state: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName:"TokenRedeems",
        tableName:'tokenRedeems',
        timestamps:false
    })
    return TokenRedeems;
}