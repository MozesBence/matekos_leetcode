    const { Model } = require('sequelize');
const { nullable } = require('zod');

module.exports = (sequelize, DataTypes) => {
    class Tasks extends Model {}

Tasks.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            theme_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            solution: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            creator_id:{
                type: DataTypes.INTEGER,
                allowNull:true,
                defaultValue: null
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            experience_points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            task_title: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            task: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
			solution_format:{
				type: DataTypes.STRING,
				allowNull: false
			},
            first_hint:{
                type: DataTypes.STRING,
                allowNull: true
            },
            second_hint:{
                type: DataTypes.STRING,
                allowNull: true
            },
            validated:{
                type: DataTypes.TINYINT(1),
                allowNull: false,
                defaultValue:0
            }
        },
        {
            sequelize,
            modelName: 'Tasks',
            tableName: 'tasks',
            timestamps: false,
        }
    );
    Tasks.initializeTasks = async () => {
        const testTasks = [
            {
                id: 1,
                theme_id: 11,
                solution: "120",
                difficulty: 2,
                experience_points: 25,
                task_title: "Gráfelmélet alapok",
                task: "Egy 5 csúcsú összefüggő gráfnak legalább hány éle van?",
                solution_format: "Egész szám",
                first_hint: "Egy fa éleinek száma $n-1$.",
                second_hint: "Összefüggő gráfban legalább annyi él van, mint egy fában.",
                validated:1
            },
            {
                id: 2,
                theme_id: 3,
                solution: "1 2 3",
                difficulty: 2,
                experience_points: 25,
                task_title: "Harmadfokú egyenlet",
                task: "Oldd meg valós számok halmazán: $x^3 - 6x^2 + 11x - 6 = 0$",
                solution_format: "Három szám szóközzel",
                first_hint: "Próbáld megtalálni az egész gyököket az osztók segítségével.",
                second_hint: "A lehetséges gyökök a konstans tag osztói (±1, ±2, ±3, ±6).",
                validated:1
            },
            {
                id: 3,
                theme_id: 9,
                solution: "2",
                difficulty: 2,
                experience_points: 25,
                task_title: "Integrálás",
                task: "Számítsd ki: $\\int_{0}^{1} (3x^2 + 2x) \\, dx$",
                solution_format: "Egész szám",
                first_hint: "Integrálás tagonként: $\\int 3x^2 dx + \\int 2x dx$.",
                second_hint: "A határozott integrál kiszámítása a határok behelyettesítésével.",
                validated:1
            },
            {
                id: 4,
                theme_id: 15,
                solution: "30",
                difficulty: 2,
                experience_points: 25,
                task_title: "Háromszög kerülete",
                task: "Egy egyenlő oldalú háromszög területe $25\\sqrt{3}$ cm². Mennyi a kerülete?",
                solution_format: "Egész szám",
                first_hint: "Az egyenlő oldalú háromszög területe: $\\frac{a^2\\sqrt{3}}{4}$.",
                second_hint: "Oldd meg az egyenletet $a$-ra, majd számítsd ki a kerületet.",
                validated:1
            },
            {
                id: 5,
                theme_id: 18,
                solution: "5",
                difficulty: 2,
                experience_points: 25,
                task_title: "Moduláris egyenlet",
                task: "Oldd meg: $3x \\equiv 1 \\pmod{7}$",
                solution_format: "Egész szám",
                first_hint: "Keress olyan $x$-et, ahol $3x - 1$ osztható 7-tel.",
                second_hint: "Próbálkozz $x=0$-tól $6$-ig.",
                validated:1
            },
        
            // ### További példák ###
            {
                id: 6,
                theme_id: 20,
                solution: "100",
                difficulty: 2,
                experience_points: 25,
                task_title: "Térgeometria",
                task: "Egy kocka felszíne 150 cm². Mennyi a térfogata?",
                solution_format: "Egész szám",
                first_hint: "A kocka felszíne: $6a^2$.",
                second_hint: "Először számold ki az él hosszát.",
                validated:1
            },
            {
                id: 7,
                theme_id: 12,
                solution: "k<-2 k>2",
                difficulty: 2,
                experience_points: 25,
                task_title: "Paraméteres egyenlőtlenség",
                task: "Milyen $k$ értékekre lesz az $x^2 + kx + 1 > 0$ egyenlőtlenség minden valós $x$-re igaz?",
                solution_format: "k<-2 k>2 (szóközzel elválasztva)",
                first_hint: "A diszkrimináns legyen negatív.",
                second_hint: "$k^2 - 4 < 0$.",
                validated:1
            },
            {
                id: 8,
                theme_id: 21,
                solution: "0.25",
                difficulty: 2,
                experience_points: 25,
                task_title: "Trigonometrikus azonosság",
                task: "Mennyi $\\sin(15°) \\cdot \\sin(75°)$ értéke? (4 tizedesjegy)",
                solution_format: "Tizedestört",
                first_hint: "Használd a szorzattá alakító képletet: $\\sin A \\sin B = \\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]$.",
                second_hint: "$\\cos(60°) = 0.5$ és $\\cos(90°) = 0$.",
                validated:1
            },
            {
                id: 9,
                theme_id: 16,
                solution: "189",
                difficulty: 2,
                experience_points: 25,
                task_title: "Számtani-mértani sorozat",
                task: "Egy számtani sorozat első tagja 3, differenciája 4. Egy mértani sorozat első tagja 2, kvóciense 3. Hányadik tagjuk lesz egyenlő?",
                solution_format: "Egész szám",
                first_hint: "Állíts fel egyenletet: $3 + 4(n-1) = 2 \\cdot 3^{n-1}$.",
                second_hint: "Próbálkozz $n=1, 2, 3, ...$-nel.",
                validated:1
            },
            {
                id: 10,
                theme_id: 22,
                solution: "0.0001",
                difficulty: 2,
                experience_points: 25,
                task_title: "Valószínűségszámítás",
                task: "Mennyi eséllyel találunk ki egy 4 jegyű PIN-kódot első próbálkozásra?",
                solution_format: "Tizedestört (4 tizedesjegy)",
                first_hint: "Összes lehetséges kód: $10^4$.",
                second_hint: "Csak egy kedvező eset van.",
                validated:1
            },
        ];
    
    
        await Tasks.bulkCreate(testTasks, {ignoreDuplicates: true})
    }
    return Tasks;
};
