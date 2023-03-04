const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 240],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 240],
            },
        },
    },
    {
        sequelize,
    }
);

module.exports = Comments;
