import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        username: { type: String },
        password: { type: String }
    },
    {
        discriminatorKey: 'type'
    }
);

export interface UserInterface extends Document {
    type: String;
    username: String;
    password: String;
}

export const User = mongoose.model<UserInterface>('user', UserSchema);
export default User;