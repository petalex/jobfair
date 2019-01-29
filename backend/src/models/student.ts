import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

let Student = new Schema(
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
        year: {
            type: Number
        },
        graduated: {
            type: Boolean
        },
        profile: {
            type: String
        }
    },
    {
        discriminatorKey: 'type'
    }
);

export default User.discriminator('student', Student);