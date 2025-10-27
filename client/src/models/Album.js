import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    title: {type: String, required: true},
    photo: {type: String},
    description: {type: String},
    musics: [{type: mongoose.Types.ObjectId, ref: 'musics'}]
})

const album = mongoose.model("albums", AlbumSchema);

export default album;