import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export enum Field {
    IT,
    Telecommunication,
    Energetics,
    CivilArchitecture,
    MechanicalEngineering
}

let User = new Schema({
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
    mail:{
        type: String
    },
    site:{
        type: String
    },
    field:{
        type: Field
    },
    specialty:{
        type: String
    },
    logo: {
        type: String
    }
});

export default mongoose.model('User', User);