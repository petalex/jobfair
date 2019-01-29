import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

let Company = new Schema(
    {
        name: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String
        },
        executive: {
            type: String
        },
        taxid: {
            type: Number
        },
        employees: {
            type: Number
        },
        mail: {
            type: String
        },
        site: {
            type: String
        },
        field: {
            type: String
        },
        specialty: {
            type: String
        },
        logo: {
            type: String
        }
    },
    {
        discriminatorKey: 'type'
    }
);

export default User.discriminator('company', Company);