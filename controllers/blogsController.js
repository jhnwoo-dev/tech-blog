const express = require("express");
const router = express.Router();
const { User, Blogs, Comments } = require("../models");

//find all blogs
router.get("/", (req, res) => {
    Blogs.findAll({ include: [User, Comments] })
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//find blog by id
router.get("/:id", (req, res) => {
    Blogs.findByPk(req.params.id, {
        include: [User, Comments],
    })
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//create new blog
router.post("/", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Blogs.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        UserId: req.session.userId,
    })
        .then((blogsData) => {
            res.json(blogsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//delete blog
router.delete("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Blogs.findByPk(req.params.id)
        .then((blogsData) => {
            if (!blogsData) {
                return res
                    .status(404)
                    .json({ msg: "No blog post exists under that id." });
            } else if (blogsData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That blog post does not belong to you." });
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
                    res.status(500).json({ msg: "An error has occured.", err });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

// update blog
router.put("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login first post" });
    }
    console.log(req.body);
    Blogs.findByPk(req.params.id)
        .then((blogsData) => {
            if (!blogsData) {
                return res
                    .status(404)
                    .json({ msg: "No blog post exists under that id." });
            } else if (blogsData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That blog post does not belong to you." });
            }
            Blogs.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
                .then((blogsData) => {
                    res.json(blogsData);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ msg: "An error has occured.", err });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

module.exports = router;
