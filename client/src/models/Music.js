import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    photo: {type: String},
    description: {type: String},
})

const music = mongoose.model("music", MusicSchema);

export default music;