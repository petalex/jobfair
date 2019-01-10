import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Student = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
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
});

export default mongoose.model('Student', Student);