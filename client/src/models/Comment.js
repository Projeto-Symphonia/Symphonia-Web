import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        postID: { type: mongoose.Types.ObjectId, ref: "posts" }, //COMMENT CONTÉM UM POST DE REFERÊNCIA, RELACIONAMENTO EM 'REFERENCING'
        userID: { type: mongoose.Types.ObjectId, ref: "users" }, //COMMENT CONTÉM UM USER DE REFERÊNCIA, RELACIONAMENTO EM 'REFERENCING'
        title: { type: String },
        comment: { type: String, required: true },
    },
    { versionKey: false }
);

const comment = mongoose.model("comments", CommentSchema);

export default comment;