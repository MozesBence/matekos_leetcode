const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Advertisement_Cards extends Model {}
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

    Advertisement_Cards.initializeCards = async () => {
        const items = [
            { title: "Vágj bele egy versenybe!", content: "Inspirálódj és mérd össze tudásodat másokkal – lépj be a kihívásba!", button_title: "Kezdés", redirect: "/contest" },
            { title: "Tanulós zene válogatás", content: "Válogattunk neked olyan zenéket, amiket mi, fejlesztők, szívesen hallgatunk tanulás közben. Engedd, hogy a ritmus motiváljon!", button_title: "Zene", redirect: "https://music.youtube.com/browse/VLPL9bxdY6QqIVXPlbrfbUQGjRw3kWJS6nc7" },
            { title: "Költsd el az aranyaidat!", content: "Költsd el aranyaid limitált merchekre vagy oldalon belül használható tárgyakra!", button_title: "Irány az áruház", redirect: "/store" },
            { title: "Nézz rá a communityra!", content: "Csatlakozz a közösséghez, találkozz hasonló gondolkodású emberekkel, és építsd tovább tudásodat!", button_title: "Community", redirect: "/community" },
            { title: "Küldj be feladatot, és járulj hozzá a közösséghez!",content: "Ha a feladatodat elfogadják az adminok, az oldalon a feladatnál a te neved lesz feltüntetve.",button_title: "Feladat beküldése",redirect: "/task-creation"},
        ];


        for (const item of items){
            await Advertisement_Cards.findOrCreate({
                where: {title: item.title},
                defaults:item,
            })
        }
    }

    return Advertisement_Cards;
};
