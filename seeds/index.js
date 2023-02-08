const sequelize = require("../config/connection");
const { User, Blogs } = require("../models");

const seed = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(
        [
            {
                email: "joe@joe.joe",
                password: "password",
            },
            {
                email: "shiva@joe.joe",
                password: "iAmCatMeow",
            },
            {
                email: "bahamut@joe.joe",
                password: "iAmDragonRawr",
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
        {
            chirp: "Moar treats plz",
            UserId: 3,
        },
        {
            chirp: "New Rule: no more car rides",
            UserId: 3,
        },
        {
            chirp: "Hoomans, go ahead, pet the tummy. It not trap",
            UserId: 2,
        },
    ]);
    process.exit(1);
};

seed();
