import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({

})

const User = model<IUser>('User', userSchema)
export default User;