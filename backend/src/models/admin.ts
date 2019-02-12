import mongoose from 'mongoose';
import User, { UserInterface } from './user';

const Schema = mongoose.Schema;

let AdminSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        phone: { type: String },
        mail: { type: String },
        profile: { type: String }
    }, 
    {
        discriminatorKey: 'type'
    }
);

export interface AdminInterface extends UserInterface {
    firstname: String;
    lastname: String;
    phone: String;
    mail: String;
    profile: String;
}

export const Admin = User.discriminator<AdminInterface>('admin', AdminSchema);
export default Admin;