import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        albumID: {type: mongoose.Types.ObjectId, ref: 'albums'}, //POST CONTÉM UM ALBÚM DE REFERÊNCIA, RELACIONAMENTO EM 'REFERENCING'
        userID: {type: mongoose.Types.ObjectId, ref: "users"},   //POST CONTÉM UM USER DE REFERÊNCIA, RELACIONAMENTO EM 'REFERENCING'
        avaliation: {type: Number, required: true},
        comment: {type: String}
    },
    { versionKey: false }
);

const post = mongoose.model("posts", PostSchema);

export default post;
