import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Field = new Schema({
    field: {
        type: String
    },
    name: {
        type: String
    }
});

export default mongoose.model('field', Field);