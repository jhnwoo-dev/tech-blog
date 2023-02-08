const express = require("express");
const router = express.Router();
const { Blogs, User } = require("../models");

router.get("/", (req, res) => {
    Blogs.findAll({
        include: [User],
    }).then((blogsData) => {
        console.log(blogsData);
        const hbsBlogs = blogsData.map((blogs) => blogs.toJSON());
        console.log("==============================");
        console.log(hbsBlogs);
        res.render("home", {
            allBlogs: hbsBlogs,
        });
    });
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/profile", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    User.findByPk(req.session.userId, {
        include: [Blogs],
    }).then((userdata) => {
        console.log(userdata);
        const hbsData = userdata.toJSON();
        console.log("==============================");
        console.log(hbsData);
        res.render("profile", hbsData);
    });
    // res.redirect("/sessions")
});

module.exports = router;
