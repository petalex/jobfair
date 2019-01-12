import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Type = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    }
});

export default mongoose.model('type', Type);