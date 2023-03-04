const User = require("./User");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

Blogs.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Blogs);

Comments.belongsTo(Blogs, {
    onDelete: "CASCADE",
});
Blogs.hasMany(Comments);

Comments.belongsTo(User, {
    onDelete: "CASCADE",
});

User.hasMany(Comments);

module.exports = {
    User,
    Blogs,
    Comments,
};
