const express = require("express");
const router = express.Router();
const { Blogs, User, Comments } = require("../models");

router.get("/", (req, res) => {
    Blogs.findAll({
        include: [User, Comments],
    }).then((blogsData) => {
        console.log(blogsData);
        const hbsBlogs = blogsData.map((blogs) => blogs.toJSON());
        let email;
        if (req.session.userId) {
            email = req.session.email;
        }
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
    Blogs.findAll({
        include: [User, Comments],
        order: [["id", "DESC"]],
        where: { UserId: req.session.userId },
    }).then((blogsData) => {
        const hbsBlogs = blogsData.map((blogs) => blogs.toJSON());
        let email;
        if (req.session.userId) {
            email = req.session.email;
        }
        res.render("home", {
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
