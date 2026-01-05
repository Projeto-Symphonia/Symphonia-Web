import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        photo: { type: String },
        posts: [{type: mongoose.Types.ObjectId, ref: 'posts'}], //USER CONTÉM POSTS, RELACIONAMENTO EM 'EMBEDDING'
    },
    { versionKey: false }
);

// Middleware que criptografa a senha antes de salvar :p
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método de comparar senha no login
UserSchema.methods.comparePassword = async function(passwordAttempt) {
    return await bcrypt.compare(passwordAttempt, this.password);
};

const user = mongoose.model("users", UserSchema);

export default user;
