const {Model, Sequelize,DataTypes} = require('sequelize')


module.exports = (sequelize,DataTypes) => {
    class Advertisement_Cards extends Model{}
    Advertisement_Cards.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
        },
        title:{
            type: DataTypes.STRING(35),
            allowNull:false
        },
        content:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        button_title:{
            type:DataTypes.STRING(35),
            allowNull:false
        },
        redirect:{
            type:DataTypes.STRING(255),
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'Advertisement_Cards',
        tableName:'advertisement_cards',
        timestamps: false
    })
    return Advertisement_Cards
}