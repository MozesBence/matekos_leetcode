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
                defaultValue: nullable
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
                theme_id: 1,
                solution: "2 -8",
                difficulty: 0,
                experience_points: 10,
                task_title: "Abszolútérték egyenlet",
                task: "Oldd meg a $|x + 3| = 5$ egyenletet!",
                solution_format: "Két egész szám szóközzel elválasztva",
                first_hint: "$|a| = b \\Rightarrow a = b$ vagy $a = -b$",
                second_hint: "Két eset: $x + 3 = 5$ és $x + 3 = -5$"
            },
            {
                id: 2,
                theme_id: 3,
                solution: "3",
                difficulty: 0,
                experience_points: 10,
                task_title: "Lineáris egyenlet",
                task: "Oldd meg: $2(x - 1) = 4$",
                solution_format: "Egész szám",
                first_hint: "Először bontsd fel a zárójelet",
                second_hint: "Ossz el 2-vel az utolsó lépésben"
            },
            {
                id: 3,
                theme_id: 8,
                solution: "4",
                difficulty: 1,
                experience_points: 15,
                task_title: "Logaritmikus egyenlet",
                task: "Oldd meg: $3 + \\log_2(x - 2) = \\log_2(2x + 8)$",
                solution_format: "Egész szám",
                first_hint: "Alakítsd át a képletet logaritmus azonosságokkal",
                second_hint: "$2x + 8 = 8(x - 2)$"
            },
            {
                id: 4,
                theme_id: 13,
                solution: "2 -3",
                difficulty: 0,
                experience_points: 10,
                task_title: "Egyenes paraméterei",
                task: "Add meg az $y = 2x - 3$ meredekségét és tengelymetszetét!",
                solution_format: "m b (szóközzel elválasztva)",
                first_hint: "$y = mx + b$ alak",
                second_hint: "m = 2, b = -3"
            },
            {
                id: 5,
                theme_id: 15,
                solution: "60",
                difficulty: 1,
                experience_points: 15,
                task_title: "Háromszög terület",
                task: "Számítsd ki egy 12 cm alapú és 10 cm magas háromszög területét!",
                solution_format: "Egész szám",
                first_hint: "Terület = (alap × magasság)/2",
                second_hint: "12 × 10 / 2 = 60"
            },
            {
                id: 6,
                theme_id: 18,
                solution: "6",
                difficulty: 0,
                experience_points: 10,
                task_title: "Legnagyobb közös osztó",
                task: "Mennyi lnko(12, 18)?",
                solution_format: "Egész szám",
                first_hint: "Prímtényezős felbontás",
                second_hint: "12 = 2²×3, 18 = 2×3²"
            },
            {
                id: 7,
                theme_id: 21,
                solution: "0.5",
                difficulty: 1,
                experience_points: 15,
                task_title: "Szinusz érték",
                task: "Mennyi $\\sin(30°)$?",
                solution_format: "Tizedestört (ponttal)",
                first_hint: "30°-os szög szinusza",
                second_hint: "Egyszerű háromszög alapján"
            },
            {
                id: 8,
                theme_id: 5,
                solution: "x>3",
                difficulty: 1,
                experience_points: 15,
                task_title: "Egyenlőtlenség",
                task: "Oldd meg: $2x - 5 > 1$",
                solution_format: "x>3 formában",
                first_hint: "Először adj hozzá 5-t",
                second_hint: "Ossz el 2-vel"
            },
            {
                id: 9,
                theme_id: 11,
                solution: "120",
                difficulty: 2,
                experience_points: 25,
                task_title: "Permutáció",
                task: "Hányféleképpen rendezhető 5 könyv?",
                solution_format: "Egész szám",
                first_hint: "5 faktoriális (5!)",
                second_hint: "5×4×3×2×1 = 120"
            },
            {
                id: 10,
                theme_id: 22,
                solution: "0.5",
                difficulty: 1,
                experience_points: 15,
                task_title: "Páros dobás",
                task: "Mekkora eséllyel dobunk párosat kockával?",
                solution_format: "Tizedestört (ponttal)",
                first_hint: "3 kedvező eset",
                second_hint: "3/6 = 1/2"
            },
            {
                id: 11,
                theme_id: 7,
                solution: "5",
                difficulty: 1,
                experience_points: 15,
                task_title: "Gyök értelmezése",
                task: "Mely egész számokra értelmezhető $\\sqrt{5 - x}$?",
                solution_format: "Egész szám (legnagyobb)",
                first_hint: "A gyökjel alatt nemnegatív kifejezés",
                second_hint: "$5 - x \\geq 0$"
            },
            {
                id: 12,
                theme_id: 9,
                solution: "6",
                difficulty: 2,
                experience_points: 25,
                task_title: "Deriválás",
                task: "Mennyi az $f(x) = 3x^2$ deriváltja az $x=1$ pontban?",
                solution_format: "Egész szám",
                first_hint: "Deriválási szabály: $f'(x^n) = n \\cdot x^{n-1}$",
                second_hint: "$f'(x) = 6x$"
            },
            {
                id: 13,
                theme_id: 14,
                solution: "Hamis",
                difficulty: 0,
                experience_points: 10,
                task_title: "Logikai állítás",
                task: "Igaz-e: Ha esik az eső, akkor a föld nedves. A föld nedves. → Esik az eső.",
                solution_format: "Hamis vagy Igaz",
                first_hint: "Logikai következtetés hibái",
                second_hint: "Hamis következtetés"
            },
            {
                id: 14,
                theme_id: 16,
                solution: "16",
                difficulty: 1,
                experience_points: 15,
                task_title: "Számtani sorozat",
                task: "Mennyi a 2, 5, 8, ... sorozat 5. tagja?",
                solution_format: "Egész szám",
                first_hint: "Különbség: 3",
                second_hint: "$a_5 = 2 + 4×3$"
            },
            {
                id: 15,
                theme_id: 19,
                solution: "15",
                difficulty: 1,
                experience_points: 15,
                task_title: "Szöveges feladat",
                task: "Hány éves Anna, ha 5 év múlva háromszor annyi lesz, mint 10 éve?",
                solution_format: "Egész szám",
                first_hint: "Legyen x Anna kora: $x + 5 = 3(x - 10)$",
                second_hint: "$x + 5 = 3x - 30$"
            },
            {
                id: 16,
                theme_id: 20,
                solution: "904.32",
                difficulty: 2,
                experience_points: 25,
                task_title: "Gömb térfogat",
                task: "Számítsd ki egy 6 cm sugarú gömb térfogatát! (π≈3.1416)",
                solution_format: "Tizedestört (ponttal)",
                first_hint: "Képlet: $V = \\frac{4}{3}πr^3$",
                second_hint: "$6^3 = 216$"
            },
            {
                id: 17,
                theme_id: 4,
                solution: "3 2",
                difficulty: 1,
                experience_points: 15,
                task_title: "Egyenletrendszer",
                task: "Oldd meg: $\\begin{cases} x + y = 5 \\\\ 2x - y = 4 \\end{cases}$",
                solution_format: "x y (szóközzel elválasztva)",
                first_hint: "Add össze a két egyenletet",
                second_hint: "$3x = 9$ → $x = 3$"
            },
            {
                id: 18,
                theme_id: 6,
                solution: "x^2+4x+4",
                difficulty: 0,
                experience_points: 10,
                task_title: "Nevezetes azonosság",
                task: "Egyszerűsítsd: $(x + 2)^2$",
                solution_format: "Algebrai kifejezés (pl. x^2+2x+1)",
                first_hint: "Nevezetes azonosság: $(a + b)^2 = a^2 + 2ab + b^2$",
                second_hint: "$x^2 + 4x + 4$"
            },
            {
                id: 19,
                theme_id: 10,
                solution: "4",
                difficulty: 0,
                experience_points: 10,
                task_title: "Halmazművelet",
                task: "Hány elemű az $A \\cup B$, ha $|A|=3$, $|B|=2$, és $A \\cap B = \\{1\\}$?",
                solution_format: "Egész szám",
                first_hint: "Képlet: $|A \\cup B| = |A| + |B| - |A \\cap B|$",
                second_hint: "$3 + 2 - 1 = 4$"
            },
            {
                id: 20,
                theme_id: 12,
                solution: "k>=4",
                difficulty: 2,
                experience_points: 25,
                task_title: "Paraméteres egyenlet",
                task: "Milyen $k$ értékre van valós megoldása az $x^2 + kx + 4 = 0$ egyenletnek?",
                solution_format: "k>=érték vagy k<=-4",
                first_hint: "A diszkrimináns nemnegatív",
                second_hint: "$k^2 - 16 \\geq 0$"
            },
            {
                id: 21,
                theme_id: 2,
                solution: "Igaz",
                difficulty: 2,
                experience_points: 25,
                task_title: "Bizonyítás alapok",
                task: "Igaz-e: Ha $n$ páros, akkor $n^2$ is páros.",
                solution_format: "Igaz vagy Hamis",
                first_hint: "Páros szám: $n = 2k$",
                second_hint: "$n^2 = 4k^2$, ami páros"
            },
            {
                id: 22,
                theme_id: 17,
                solution: "7",
                difficulty: 1,
                experience_points: 15,
                task_title: "Átlag számítás",
                task: "Mennyi a 3, 5, 7, 9, 11 számok átlaga?",
                solution_format: "Egész szám",
                first_hint: "Összeg = 3+5+7+9+11",
                second_hint: "35 / 5 = 7"
            },
            {
                id: 23,
                theme_id: 23,
                solution: "60",
                difficulty: 1,
                experience_points: 15,
                task_title: "Szög átváltás",
                task: "Hány fok $\\frac{\\pi}{3}$ radián?",
                solution_format: "Egész szám",
                first_hint: "$\\pi$ radián = 180°",
                second_hint: "$\\frac{180°}{3} = 60°$"
            },
            {
                id: 24,
                theme_id: 24,
                solution: "0.1667",
                difficulty: 2,
                experience_points: 25,
                task_title: "Feltételes valószínűség",
                task: "Mekkora valószínűséggel dobunk 6-ot egy szabályos kockával?",
                solution_format: "Tizedestört (4 tizedesjegy)",
                first_hint: "1 kedvező eset (6) 6-ból",
                second_hint: "1/6 ≈ 0.1667"
            },
            {
                id: 25,
                theme_id: 25,
                solution: "24",
                difficulty: 2,
                experience_points: 25,
                task_title: "Kocka felszíne",
                task: "Egy kocka élének hossza 2 cm. Mennyi a felszíne?",
                solution_format: "Egész szám",
                first_hint: "Felszín = $6a^2$",
                second_hint: "$6 × 2^2 = 24$"
            },
            {
                id: 26,
                theme_id: 1,
                solution: "0 -1",
                difficulty: 1,
                experience_points: 15,
                task_title: "Abszolútérték egyenlet",
                task: "Oldd meg: $|2x + 1| = 1$",
                solution_format: "Két egész szám szóközzel elválasztva",
                first_hint: "Két eset: $2x + 1 = 1$ és $2x + 1 = -1$",
                second_hint: "Megoldások: $x=0$ és $x=-1$"
            },
            {
                id: 27,
                theme_id: 8,
                solution: "1000",
                difficulty: 1,
                experience_points: 15,
                task_title: "Exponenciális növekedés",
                task: "Mennyi $10^3$?",
                solution_format: "Egész szám",
                first_hint: "10 hatványai",
                second_hint: "10×10×10 = 1000"
            },
            {
                id: 28,
                theme_id: 9,
                solution: "1",
                difficulty: 2,
                experience_points: 25,
                task_title: "Függvény határérték",
                task: "Mennyi $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$?",
                solution_format: "Egész szám",
                first_hint: "Nevezetes határérték",
                second_hint: "Az eredmény 1"
            },
            {
                id: 29,
                theme_id: 10,
                solution: "1",
                difficulty: 0,
                experience_points: 10,
                task_title: "Halmazok metszete",
                task: "Legyen $A = \\{1,2,3\\}$, $B = \\{3,4,5\\}$. Mennyi $|A \\cap B|$?",
                solution_format: "Egész szám",
                first_hint: "Közös elemek száma",
                second_hint: "$A \\cap B = \\{3\\}$"
            },
            {
                id: 30,
                theme_id: 12,
                solution: "k<=-4",
                difficulty: 2,
                experience_points: 25,
                task_title: "Paraméteres egyenlet",
                task: "Milyen $k$ értékre van valós megoldása az $x^2 + kx + 4 = 0$ egyenletnek?",
                solution_format: "k<=-4 vagy k>=4",
                first_hint: "A diszkrimináns nemnegatív",
                second_hint: "$k^2 - 16 \\geq 0$"
            }
        ];
    
    
        await Tasks.bulkCreate(testTasks, {ignoreDuplicates: true})
    }
    return Tasks;
};
