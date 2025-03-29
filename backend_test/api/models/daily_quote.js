const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class DailyQuote extends Model {}

        DailyQuote.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            quote: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        }, 
        {
            sequelize,
            modelName: 'DailyQuote',
            tableName: 'daily_quotes',
            timestamps: false
        },

        DailyQuote.initializeDailyQuote = async () => {
            const defaultDailyQuote = [
                { id: 1, quote: "Teszt quote" },
            ];
    
            for (const th of defaultDailyQuote) {
                await DailyQuote.create(th);
            }
        }
    );

    return DailyQuote;
};

