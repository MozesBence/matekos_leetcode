const { Model, Sequelize} = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    class Transactions extends Model {}

    Transactions.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        currency: {
            type: DataTypes.ENUM("gold", "wayBackToken"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["gold", "wayBackToken"]],
                    msg: "Érvénytelen tranzakciótípus."
                }
            }
        },
        itemId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    msg: "Az összegnek egész számnak kell lennie."
                },
                min: {
                    args: [1],
                    msg: "Az összegnek legalább 1-nek kell lennie."
                }
            },
        },
    }, 
    {
        sequelize,
        tableName: "transactions",
        modelName: "Transactions",
        timestamps: true,
    });

    return Transactions;
};
