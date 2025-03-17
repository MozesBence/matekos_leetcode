const { Sequelize, Model, DataTypes } = require("../database/dbContext");

module.exports = (sequelize) => {
    class StoreItems extends Model {}

    StoreItems.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            picture: {
                type: DataTypes.BLOB("long"),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 100,
            },
        },
        {
            sequelize,
            tableName: "storeItems",
            modelName: "StoreItems",
            timestamps: false,
        }
    );

    StoreItems.initializeStoreItems = async () => {
        const defaultStoreItems = [
            {
                name: "Időfordító Zseton",
                description:
                    "Ha lemaradsz egy napi feladatról, megoldhatod ennek segítségével. Egy hónapban csak 3-at lehet felhasználni!",
                picture: "nincs",
                price: 100,
            },
            {
                name: "Math Solve póló",
                description: "Egyedi mintás póló, tőlünk neked, ingyen!",
                picture: "sasa",
                price: 12000,
            },
            {
                name: "Math Solve bögre",
                description: "Egyedi mintás bögre, tőlünk neked, ingyen!",
                picture: "sasa",
                price: 9000,
            },
            {
                name: "Math Solve füzet",
                description: "Egyedi mintás füzet, tőlünk neked, ingyen!",
                picture: "sasa",
                price: 5500,
            },
        ];

        for (const item of defaultStoreItems) {
            await StoreItems.findOrCreate({
                where: { name: item.name },
                defaults: item,
            });
        }
    };

    return StoreItems;
};
