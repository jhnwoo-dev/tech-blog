const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogs extends Model {}

Blogs.init(
    {
        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Blogs;
