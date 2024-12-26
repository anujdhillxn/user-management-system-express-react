import mongoose, { Schema } from "mongoose";
import { IToken, ITokenModel } from "../types/models";

const TokenSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Token = mongoose.model<IToken, ITokenModel>("Token", TokenSchema);
export default Token;
