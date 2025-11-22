import express from 'express'
import conectToDB from './config/dbConnect.js';
import routes from './routes/index.js';
const app = express();
routes(app);

const connection = await conectToDB();

connection.on("error", (error) => {
    console.error("Connection failed, error below: \n" + error);
});

connection.once("open", () => {
    console.log(`conection is on with mongoDB\n`);
});




export default app;