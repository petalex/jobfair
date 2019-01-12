import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

let Admin = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        phone: {
            type: String
        },
        mail: {
            type: String
        },
        profile: {
            type: Buffer
        }
    }, 
    {
        discriminatorKey: 'type'
    }
);

export default User.discriminator('admin', Admin);