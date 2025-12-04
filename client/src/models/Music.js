import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    title: {type: String, required: true},
    description: {type: String},
}, {versionKey: false})

const music = mongoose.model("musics", MusicSchema);

export default music;