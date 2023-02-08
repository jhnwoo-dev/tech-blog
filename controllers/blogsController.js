const express = require("express");
const router = express.Router();
const { User, Blogs } = require("../models");

router.get("/", (req, res) => {
    Blogs.findAll()
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Uh oh!", err });
        });
});
router.get("/:id", (req, res) => {
    Blogs.findByPk(req.params.id, {
        include: [User],
    })
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "oh noes!", err });
        });
});

router.post("/", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login first post" });
    }
    console.log(req.body);
    Blogs.create({
        blogs: req.body.blogs,
        UserId: req.session.userId,
    })
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "oh noes!", err });
        });
});

router.delete("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login first post" });
    }
    console.log(req.body);
    Blogs.findByPk(req.params.id)
        .then((blogsData) => {
            if (!blogsData) {
                return res.status(404).json({ msg: "no such blog post" });
            } else if (blogsData.UserId !== req.session.userId) {
                return res.status(403).json({ msg: "not your blog post!" });
            }
            Blogs.destroy({
                where: {
                    id: req.params.id,
                },
            })
                .then((blogsData) => {
                    res.json(blogsData);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ msg: "Uh oh!", err });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Uh oh!", err });
        });
});

module.exports = router;
