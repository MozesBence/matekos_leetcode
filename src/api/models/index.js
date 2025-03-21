module.exports = (sequelize, DataTypes) => {
    const Users = require("../models/users")(sequelize, DataTypes);
    const Community_posts = require("../models/community_posts")(sequelize, DataTypes);
    const Community_comments = require("../models/community_comments")(sequelize, DataTypes);
    const Community_files = require("../models/community_files")(sequelize, DataTypes);
    const Community_likes = require("../models/community_likes")(sequelize, DataTypes);
    const Community_tags = require("../models/community_tags")(sequelize, DataTypes);
    const Themes = require("../models/themes")(sequelize, DataTypes);
    const Tasks = require("../models/tasks")(sequelize, DataTypes);
    const Competitions = require("../models/competitions")(sequelize, DataTypes);
    const Competitions_types = require("../models/competition_types")(sequelize, DataTypes);
    const Badges = require("../models/badges")(sequelize, DataTypes);
    const Alerts = require("../models/alerts")(sequelize, DataTypes);
    const Tokenz = require("../models/tokenz")(sequelize, DataTypes);
    const User_customization = require("../models/user_customization")(sequelize, DataTypes);
    const Daily_Tasks = require('../models/daily_tasks')(sequelize,DataTypes);
    const Notification = require("./notification")(sequelize,DataTypes);
    const Advertisement_Cards = require('../models/advertisement_cards')(sequelize, DataTypes);
    const DailyQuote = require('../models/daily_quote')(sequelize,DataTypes)
    const Competetions_attendees = require("../models/competetions_attendees")(sequelize,DataTypes);
    const Competetins_submissions = require("../models/competetins_submissions")(sequelize,DataTypes);
    const Transactions = require('../models/transactions')(sequelize,DataTypes);
    const StoreItems = require('../models/storeItems')(sequelize,DataTypes)
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
    Transactions.belongsTo(StoreItems, {
        foreignKey: "itemId",
        onDelete: "CASCADE",
    });
    
    StoreItems.hasMany(Transactions, {
        foreignKey: "itemId",
    });
    // challanges részhez a Gergő által javasolt módszer
    Tasks.belongsTo(Competitions, {
        foreignKey: "CompetitionID"
    });

    Competitions.hasMany(Tasks, {
        foreignKey: "CompetitionID"
    });
    

    Users.hasOne(User_customization, {
        foreignKey: "user_id",
    });

    Badges.belongsToMany(Users, {
        foreignKey: "badges_id",
        through: "badge_redemption",
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

    Themes.hasMany(Tasks, {
        foreignKey: 'theme_id',
    });

    // Community_posts kapcsolatai
    Community_posts.hasMany(Community_comments, {
        foreignKey: "post_id",
        allowNull: true,
    });
    Community_posts.hasMany(Community_files, {
        foreignKey: "post_id",
        allowNull: true,
    });
    Community_posts.belongsTo(Users, { // Hiányzott!
        foreignKey: "user_id",
    });

    // Community_comments kapcsolatai
    Community_comments.hasMany(Community_comments, {
        foreignKey: "parent_comment_id",
        as: 'replies',
        allowNull: true,
    });
    Community_comments.belongsTo(Community_comments, {
        as: 'parent',
        foreignKey: 'parent_comment_id'
    });

    Community_comments.belongsTo(Users, {
        foreignKey: "user_id",
    });

    // Users kapcsolatai
    Users.hasMany(Community_posts, {
        foreignKey: "user_id",
    });
    Users.hasMany(Community_comments, {
        foreignKey: "user_id",
    });

    Community_likes.belongsTo(Users, {
        foreignKey: "user_id",
    });
    Users.hasMany(Community_likes, {
        foreignKey: "user_id",
    });

    // Like kapcsolat posztokkal
    Community_likes.belongsTo(Community_posts, {
        foreignKey: "entity_id",
        constraints: false, // Polimorf kapcsolat miatt
    });
    // Like kapcsolat kommentekkel
    Community_likes.belongsTo(Community_comments, {
        foreignKey: "entity_id",
        constraints: false,
    });
    // Posztokhoz tartozó like-ok
    Community_posts.hasMany(Community_likes, {
        foreignKey: "entity_id",
        constraints: false,
    });
    // Kommentekhez tartozó like-ok
    Community_comments.hasMany(Community_likes, {
        foreignKey: "entity_id",
        constraints: false,
    });

    Community_posts.belongsToMany(Community_tags, { through: 'PostTags' });
    Community_tags.belongsToMany(Community_posts, { through: 'PostTags' });

    Users.hasMany(Alerts, {
        foreignKey: "user_id",
    });

    Users.hasMany(Tokenz, {
        foreignKey: "user_id",
    });

    Users.hasMany(Notification, {
        foreignKey: "user_id",
        as: "SentReports" // A felhasználó által küldött bejelentések
    });
    
    Users.hasMany(Notification, {
        foreignKey: "from_user_id",
        as: "ReceivedReports" // A felhasználóról érkezett bejelentések
    });
    
    // Fordított kapcsolatok a Notification táblában:
    Notification.belongsTo(Users, {
        foreignKey: "user_id",
        as: "Reporter" // Bejelentést küldő személy
    });
    
    Notification.belongsTo(Users, {
        foreignKey: "from_user_id",
        as: "ReportedUser" // A bejelentés célpontja (akiről szó van)
    });
    
    Task_solutions.belongsTo(Users, {
        foreignKey: "UserId",
    });

    Task_solutions.belongsTo(Tasks, {
        foreignKey: "task_id",
    });

    Tasks.hasMany(Task_solutions, {
        foreignKey: "task_id",
    });




    Community_posts.hasMany(Notification, { foreignKey: 'content_id', as: 'reportedPost' });
    Community_comments.hasMany(Notification, { foreignKey: 'content_id', as: 'reportedComment' });

    Notification.belongsTo(Community_posts, { foreignKey: 'content_id', constraints: false, as: 'reportedPost' });
    Notification.belongsTo(Community_comments, { foreignKey: 'content_id', constraints: false, as: 'reportedComment' });

    return {
        Users,
        Community_posts,
        Community_comments,
        Community_files,
        Community_likes,
        Community_tags,
        Themes,
        Tasks,
        Competitions,
        Competitions_types,
        Badges,
        Alerts,
        Tokenz,
        User_customization,
        Task_solutions,
        Daily_Tasks,
        Notification,
        Advertisement_Cards,
        DailyQuote,
        Transactions,
        StoreItems
    };
};
