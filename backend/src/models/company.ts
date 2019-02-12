import mongoose from 'mongoose';
import User, { UserInterface } from './user';

const Schema = mongoose.Schema;

let ParticipantSchema = new Schema({
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    mail: { type: String },
    cover: { type: String },
    score: { type: Number },
    offered: { type: Boolean },
    accepted: { type: Boolean }
});

let ContestSchema = new Schema({
    type: { type: String },
    title: { type: String },
    info: { type: String },
    deadline: { type: Date },
    files: { type: [String] },
    participants: { type: [ParticipantSchema] },
    company: String
});

let CompanySchema = new Schema(
    {
        name: { type: String },
        city: { type: String },
        address: { type: String },
        executive: { type: String },
        taxid: { type: Number },
        employees: { type: Number },
        mail: { type: String },
        site: { type: String },
        field: { type: String },
        specialty: { type: String },
        logo: { type: String },
        contests: { type: [ContestSchema] }
    },
    {
        discriminatorKey: 'type'
    }
);

export interface ParticipantInterface {
    username: String;
    firstname: String;
    lastname: String;
    phone: String;
    mail: String;
    cover: String;
    score: String;
    offered: Boolean;
    accepted: Boolean;
}

export interface ContestInterface {
    type: String;
    title: String;
    info: String;
    deadline: Date;
    files: String[];
    participants: ParticipantInterface[];
    company: String;
}

export interface CompanyInterface extends UserInterface {
    name: String;
    city: String;
    address: String;
    executive: String;
    taxid: Number;
    employees: Number;
    mail: String;
    site: String;
    field: String;
    specialty: String;
    logo: String;
    contests: ContestInterface[];
}

export const Company = User.discriminator<CompanyInterface>('company', CompanySchema);
export default Company;