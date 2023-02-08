const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogs extends Model {}

Blogs.init(
    {
        blogs: {
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

module.exports = Blogs;
