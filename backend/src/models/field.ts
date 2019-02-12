import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

let FieldSchema = new Schema({
    name: { type: String }
});

export interface FieldInterface extends Document {
    name: String;
}

export const Field = mongoose.model<FieldInterface>('field', FieldSchema);
export default Field;