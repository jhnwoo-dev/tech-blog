const User = require("./User");
const Blogs = require("./Blogs");

Blogs.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Blogs);

module.exports = {
    User,
    Blogs,
};
