const express = require("express");
const router = express.Router();
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
    Blog.findAll({
        include: [User, Comment],
        order: [["id", "DESC"]],
    }).then((blogData) => {
        console.log(blogData);
        const hbsBlogs = blogData.map((blog) => blog.toJSON());
        let email;
        console.log("====================");
        if (req.session.userId) {
            email = req.session.userEmail;
            console.log(req.session.userEmail);
        }
        console.log("====================");
        res.render("home", {
            allBlogs: hbsBlogs,
            email: email,
        });
    });
});

router.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    Blog.findAll({
        include: [User, Comment],
        order: [["id", "DESC"]],
        where: { UserId: req.session.userId },
    }).then((blogData) => {
        const hbsBlogs = blogData.map((blog) => blog.toJSON());
        let email;
        if (req.session.userId) {
            email = req.session.userEmail;
        }
        res.render("dashboard", {
            allBlogs: hbsBlogs,
            email: email,
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("login");
});

module.exports = router;
