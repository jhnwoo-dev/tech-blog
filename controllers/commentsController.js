const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

//get all comments
router.get("/", (req, res) => {
    Comment.findAll()
        .then((commentData) => {
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//get comment by id
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id, {
        include: [User, Blog],
    })
        .then((commentData) => {
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//create new comment
router.post("/", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Comment.create({
        text: req.body.comments,
        UserId: req.session.userId,
        BlogId: req.session.blogId,
        email: req.session.email,
    })
        .then((commentData) => {
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//delete comment by id
router.delete("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Comment.findByPk(req.params.id)
        .then((commentData) => {
            if (!commentData) {
                return res
                    .status(404)
                    .json({ msg: "No comment exists under that id." });
            } else if (commentData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That comment does not belong to you." });
            }
            Comment.destroy({
                where: {
                    id: req.params.id,
                },
            })
                .then((commentData) => {
                    res.json(commentData);
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

//update comment by id
router.put("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "You must login first." });
    }
    console.log(req.body);
    Comment.findByPk(req.params.id)
        .then((commentData) => {
            if (!commentData) {
                return res
                    .status(404)
                    .json({ msg: "No comment exists under that id." });
            } else if (commentData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That comment does not belong to you." });
            }
            Comment.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
                .then((commentData) => {
                    res.json(commentData);
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
