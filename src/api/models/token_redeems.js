const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class TokenRedeems extends Model {
        static init(sequelize) {
            super.init(
                {
                    user_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    task_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    submission_date: {
                        type: DataTypes.DATE,
                        allowNull: false,
                        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    state: {
                        type: DataTypes.ENUM('active', 'inactive'),
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                    modelName: 'TokenRedeems',
                    tableName: 'tokenRedeems',
                    timestamps: false,
                }
            );
        }
    }

    TokenRedeems.init(sequelize);
    return TokenRedeems;
};
