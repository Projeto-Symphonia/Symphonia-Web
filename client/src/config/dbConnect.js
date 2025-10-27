import 'dotenv/config'
import mongoose from "mongoose";


async function conectToDB(){
    mongoose.connect(process.env.DB_CONNECTION_STRING)

    return mongoose.connection;
}

export default conectToDB;