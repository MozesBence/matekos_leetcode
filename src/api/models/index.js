module.exports = (sequelize, DataTypes) =>{
    const Users = require("../models/users")(sequelize, DataTypes);

    const Topics = require("../models/topics")(sequelize, DataTypes);

    const Topics_comments = require("../models/topic_comments")(sequelize, DataTypes);

    const Themes = require("../models/themes")(sequelize, DataTypes);
    
    const Tasks = require("../models/tasks")(sequelize, DataTypes);
    
    const Task_comments = require("../models/task_comments")(sequelize, DataTypes);
    
    const Competitions = require("../models/competitions")(sequelize, DataTypes);
    
    const Competitions_types = require("../models/competition_types")(sequelize, DataTypes);
    
    const Badges = require("../models/badges")(sequelize, DataTypes);
    
    const Alerts = require("../models/alerts")(sequelize, DataTypes);

    const Tokenz = require("../models/tokenz")(sequelize, DataTypes);
    
    const User_custom = require("../models/user_customization")(sequelize, DataTypes);

    const Vip_custom = require("../models/vip_customization")(sequelize, DataTypes);

    const competition_submissions = sequelize.define("competition_submissions", {
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        exprience_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    });

    Users.hasMany(Vip_custom,{
        foreignKey: "user_id",
    });

    Users.hasMany(User_custom,{
        foreignKey: "user_id",
    });

    Badges.belongsToMany(Users,{
        foreignKey: "badges_id",
        through: "badge_redemption",
    });

    Task_comments.hasMany(Task_comments,{
        foreignKey: "parent_id",
    });

    Users.hasMany(Task_comments,{
        foreignKey: "user_id",
    });

    Tasks.belongsToMany(Users,{
        foreignKey: "task_id",
        through: "task_solutions",
    });

    Competitions.hasOne(Competitions_types,{
        foreignKey: "competition_type_id",
    });

    Competitions.belongsToMany(Users,{
        foreignKey: "competetion_id",
        through: "competition_attendees",
    });

    Competitions.belongsToMany(Users,{
        foreignKey: "competetion_id",
        through: competition_submissions,
    });

    Competitions.belongsToMany(Users,{
        foreignKey: "competetion_id",
        through: "tasks_creator",
    });

    Themes.hasOne(Tasks,{
        foreignKey: "theme_id",
    });

    Task_comments.hasOne(Tasks,{
        foreignKey: "task_comments_id",
    });

    Topics.belongsToMany(Topics_comments,{
        foreignKey: "topics_comment_id",
        through: "topics_connection",
    });

    Users.hasMany(Alerts,{
        foreignKey: "user_id",
    });

    Users.hasMany(Tokenz, {
        foreignKey: "user_id",
    });

<<<<<<< HEAD
    return { Users, Topics, Topics_comments, Themes, Tasks, Task_comments, Competitions, Competitions_types, Badges, Alerts, Tokenz };
=======
    return { Users, Topics, Topics_comments, Themes, Tasks, Task_comments, Competitions, Competitions_types, Badges, Alerts, Tokenz, User_custom, Vip_custom };
>>>>>>> cc1befd44e9c21112dae9d93c2b9bb110a952ccc
}