import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        photo: { type: String },
        posts: [{type: mongoose.Types.ObjectId, ref: 'posts'}], //USER CONTÉM POSTS, RELACIONAMENTO EM 'EMBEDDING'
    },
    { versionKey: false }
);

const user = mongoose.model("users", UserSchema);

export default user;
