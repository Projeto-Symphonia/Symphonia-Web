import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        photo: { type: String },
        description: { type: String },
        musics: [{type: mongoose.Types.ObjectId, ref: 'musics'}], //álbum CONTÉM MUSICAS, RELACIONAMENTO EM 'referencing'
    },
    { versionKey: false }
);

const album = mongoose.model("albums", AlbumSchema);

export default album;
