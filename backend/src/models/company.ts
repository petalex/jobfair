import mongoose from 'mongoose';
import Field from './field';

const Schema = mongoose.Schema;

let Company = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
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
});

export default mongoose.model('Company', Company);