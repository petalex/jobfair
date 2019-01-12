import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        discriminatorKey: 'type'
    }
);

export default mongoose.model('user', User);