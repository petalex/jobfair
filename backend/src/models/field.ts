import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Field = new Schema({
    name: {
        type: String
    }
});

export default mongoose.model('field', Field);