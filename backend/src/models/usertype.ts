import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Usertype = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    }
});

export default mongoose.model('Usertype', Usertype);