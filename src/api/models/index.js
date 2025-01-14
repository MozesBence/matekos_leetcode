module.exports = (sequelize, DataTypes) => {
    const Users = require("../models/users")(sequelize, DataTypes);
    const Community_posts = require("../models/community_posts")(sequelize, DataTypes);
    const Community_comments = require("../models/community_comments")(sequelize, DataTypes);
    const Community_files = require("../models/community_files")(sequelize, DataTypes);
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
    
    // Import Task_solutions
    const Task_solutions = require("../models/task_solution")(sequelize, DataTypes);

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

    Users.hasOne(Vip_custom, {
        foreignKey: "user_id",
    });

    Users.hasOne(User_custom, {
        foreignKey: "user_id",
    });

    Badges.belongsToMany(Users, {
        foreignKey: "badges_id",
        through: "badge_redemption",
    });

    Task_comments.hasMany(Task_comments, {
        foreignKey: "parent_id",
    });

    Users.hasMany(Task_comments, {
        foreignKey: "user_id",
    });

    // Use Task_solutions in association
    Tasks.belongsToMany(Users, {
        foreignKey: "task_id",
        through: Task_solutions,
    });

    Competitions.hasOne(Competitions_types, {
        foreignKey: "competition_type_id",
    });

    Competitions.belongsToMany(Users, {
        foreignKey: "competetion_id",
        through: "competition_attendees",
    });

    Competitions.belongsToMany(Users, {
        foreignKey: "competetion_id",
        through: competition_submissions,
    });

    Competitions.belongsToMany(Users, {
        foreignKey: "competetion_id",
        through: "tasks_creator",
    });

    Themes.hasOne(Tasks, {
        foreignKey: "theme_id",
    });

    Task_comments.hasOne(Tasks, {
        foreignKey: "task_comments_id",
    });

    Community_posts.hasMany(Community_comments, {
        foreignKey: "post_id",
        allowNull: true,
    });
    Community_comments.hasMany(Community_comments, {
        foreignKey: "parent_comment_id",
        allowNull: true,
    });
    Community_posts.hasMany(Community_files, {
        foreignKey: "post_id",
        allowNull: true,
    });

    Users.hasMany(Community_posts, {
        foreignKey: "user_id",
    });

    Users.hasMany(Alerts, {
        foreignKey: "user_id",
    });

    Users.hasMany(Tokenz, {
        foreignKey: "user_id",
    });

    return {
        Users,
        Community_posts,
        Community_comments,
        Community_files,
        Themes,
        Tasks,
        Task_comments,
        Competitions,
        Competitions_types,
        Badges,
        Alerts,
        Tokenz,
        User_custom,
        Vip_custom,
        Task_solutions, // Export Task_solutions
    };
};