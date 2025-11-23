import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema(
    {   
        albumID: {type: mongoose.Types.ObjectId, ref: 'albums'}, //MÚSICA ESTÁ PARA UM ÁLBUM, RELACIONAMENTO EM 'REFERENCING'
        title: { type: String, required: true },
        description: { type: String }
    },
    { versionKey: false }
);

const music = mongoose.model("musics", MusicSchema);

export default music;
