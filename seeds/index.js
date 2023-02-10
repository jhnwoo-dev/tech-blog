const sequelize = require("../config/connection");
const { User, Blogs } = require("../models");

const seed = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(
        [
            {
                email: "jason@woo.com",
                password: "password",
            },
        ],
        {
            individualHooks: true,
        }
    );

    const blogs = await Blogs.bulkCreate([
        {
            blogs: "I love my cats!",
            UserId: 1,
        },
    ]);
    process.exit(1);
};

seed();
