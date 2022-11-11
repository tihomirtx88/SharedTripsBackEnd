const express = require(`express`);
const expressConfig = require(`./config/express`);
const databaseConfig = require(`./config/db`);
const tripsController = require(`./controllers/trips`);
const usersController = require(`./controllers/users`);
const joinController = require(`./controllers/joinController`);

start();

async function start(){
    const app = express();
    await databaseConfig(app);
    expressConfig(app);
    app.use(`/data/trips`, tripsController);
    app.use(`/users`, usersController);
    app.use(`/data/join`, joinController);

    app.get(`/`, (req,res) => res.json({message: `REST service is operational`}));

    const PORT = process.env.PORT || 3030
    app.listen(PORT, ()=> console.log(`Server listen on port 3030`));
}