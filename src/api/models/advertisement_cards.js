const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Advertisement_Cards extends Model {
        static async insertDefaultData() {
            try {
                await Advertisement_Cards.bulkCreate([
                    { title: "Vágj bele egy versenybe!", content: "Inspirálódj és mérd össze tudásodat másokkal – lépj be a kihívásba!", button_title: "Kezdés", redirect: "/verseny" },
                    { title: "Tanulós zene válogatás", content: "Válogattunk neked olyan zenéket, amiket mi, fejlesztők, szívesen hallgatunk tanulás közben. Engedd, hogy a ritmus motiváljon!", button_title: "Zene", redirect: "/zene" },
                    { title: "Készülj a felvételire velünk!", content: "Gyere, és készülj fel a következő lépésre közösen velünk – tippek, trükkök és felkészítő anyagok várnak!", button_title: "Felvételi", redirect: "/felveteli" },
                    { title: "Nézz rá a communityra!", content: "Csatlakozz a közösséghez, találkozz hasonló gondolkodású emberekkel, és építsd tovább tudásodat!", button_title: "Community", redirect: "/community" }
                ]);
                console.log("Adatok sikeresen beszúrva!");
            } catch (err) {
                console.error("Hiba az adatbeszúrásnál:", err);
            }
        }
    }

    Advertisement_Cards.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        button_title: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        redirect: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Advertisement_Cards',
        tableName: 'advertisement_cards',
        timestamps: false
    });

    return Advertisement_Cards;
};
