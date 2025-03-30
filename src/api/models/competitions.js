const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Competitions extends Model {};

    Competitions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            identifier: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            define: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Competitions',
            tableName: 'competitions',
            timestamps: false
        }
    );

    Competitions.initializeCompetitions = async () => {
        const today = new Date();
        const currentWeek = getISOWeek(today);
        const currentMonth = today.getMonth() + 1;
    
        let weekCounter = currentWeek;
        let monthCounter = currentMonth;
    
        const items = [
            { define: "week" },
            { define: "week" },
            { define: "week" },
            { define: "month" },
            { define: "week" },
            { define: "week" },
            { define: "month" }
        ].map(item => {
            if (item.define === "week") {
                return { identifier: weekCounter--, define: "week" };
            } else {
                return { identifier: monthCounter--, define: "month" };
            }
        });
    
        await Promise.all(items.map(item => 
            Advertisement_Cards.findOrCreate({
                where: { title: item.title },
                defaults: item,
            })
        ));
    };
    
    function getISOWeek(date) {
        const tempDate = new Date(date.getTime());
        tempDate.setHours(0, 0, 0, 0);
        tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
        const yearStart = new Date(tempDate.getFullYear(), 0, 1);
        return Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    }

    return Competitions;
};
