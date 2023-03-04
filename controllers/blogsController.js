const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

//find all blogs
router.get("/", (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then((blogData) => {
            res.json(blogData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//find blog by id
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [User, Comment],
    })
        .then((blogData) => {
            res.json(blogData);
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
    Blog.create({
        title: req.body.title,
        text: req.body.text,
        UserId: req.session.userId,
    })
        .then((blogData) => {
            res.json(blogData);
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
    Blog.findByPk(req.params.id)
        .then((blogData) => {
            if (!blogData) {
                return res
                    .status(404)
                    .json({ msg: "No blog post exists under that id." });
            } else if (blogData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That blog post does not belong to you." });
            }
            Blog.destroy({
                where: {
                    id: req.params.id,
                },
            })
                .then((blogData) => {
                    res.json(blogData);
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
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Blog.findByPk(req.params.id)
        .then((blogData) => {
            if (!blogData) {
                return res
                    .status(404)
                    .json({ msg: "No blog post exists under that id." });
            } else if (blogData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That blog post does not belong to you." });
            }
            Blog.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
                .then((blogData) => {
                    res.json(blogData);
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
