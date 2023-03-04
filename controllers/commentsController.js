const express = require("express");
const router = express.Router();
const { User, Blogs, Comments } = require("../models");

//get all comments
router.get("/", (req, res) => {
    Comments.findAll()
        .then((commentsData) => {
            res.json(commentsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

//get comment by id
router.get("/:id", (req, res) => {
    Comments.findByPk(req.params.id, {
        include: [User, Blogs],
    })
        .then((commentsData) => {
            res.json(commentsData);
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
    Comments.create({
        text: req.body.comments,
        UserId: req.session.userId,
        BlogId: req.session.blogId,
        email: req.session.email,
    })
        .then((commentsData) => {
            res.json(commentsData);
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
    Comments.findByPk(req.params.id)
        .then((commentsData) => {
            if (!commentsData) {
                return res
                    .status(404)
                    .json({ msg: "No comment exists under that id." });
            } else if (commentsData.UserId !== req.session.userId) {
                return res
                    .status(403)
                    .json({ msg: "That comment does not belong to you." });
            }
            Comments.destroy({
                where: {
                    id: req.params.id,
                },
            })
                .then((commentsData) => {
                    res.json(commentsData);
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
        return res.status(403).json({
            msg: "You must login first.",
        });
    }
    Comments.findByPk(req.params.id).then((commentsData) => {
        if (!commentsData) {
            return res
                .status(404)
                .json({ msg: "No comment exists under that id." });
        } else if (commentsData.UserId !== req.session.userId) {
            return res
                .status(403)
                .json({ msg: "That comment does not belong to you." });
        }
    });
    Comments.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((commentsData) => {
            res.json(commentsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "An error has occured.", err });
        });
});

module.exports = router;
