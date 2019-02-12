import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

let TypeSchema = new Schema({
    type: { type: String },
    name: { type: String }
});

export interface TypeInterface extends Document {
    name: String;
}

export const Type = mongoose.model<TypeInterface>('type', TypeSchema);
export default Type;