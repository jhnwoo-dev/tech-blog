const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

Blog.belongsTo(User, {
    onDelete: "CASCADE",
});

User.hasMany(Blog);

Comment.belongsTo(Blog, {
    onDelete: "CASCADE",
});
Blog.hasMany(Comment);

Comment.belongsTo(User, {
    onDelete: "CASCADE",
});

User.hasMany(Comment);

module.exports = {
    User,
    Blog,
    Comment,
};
