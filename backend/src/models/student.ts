import mongoose, { Document } from 'mongoose';
import User, { UserInterface } from './user';

const Schema = mongoose.Schema;

let ForeignLanguageSchema = new Schema({
    name: { type: String },
    listening: { type: String },
    reading: { type: String },
    interaction: { type: String },
    production: { type: String },
    writing: { type: String },
    diploma: { type: String },
    attachment: { type: String }
});

let EmployerSchema = new Schema({
    name: { type: String },
    city: { type: String },
    country: { type: String },
    address: { type: String },
    zip: { type: String },
    site: { type: String },
    sector: { type: String }
});

let WorkSchema = new Schema({
    from: { type: Date },
    to: { type: Date },
    ongoing: { type: Boolean },
    format: { type: String },
    position: { type: String },
    employer: EmployerSchema,
    activities: { type: String },
    attachment: { type: String }
});

let OrganisationSchema = new Schema({
    name: { type: String },
    city: { type: String },
    country: { type: String },
    address: { type: String },
    zip: { type: String },
    site: { type: String },
    eqf: { type: Number }
});

let EducationSchema = new Schema({
    from: { type: Date },
    to: { type: Date },
    ongoing: { type: Boolean },
    format: { type: String },
    qualification: { type: String },
    organisation: OrganisationSchema,
    subjects: { type: String },
    field: { type: String },
    attachment: { type: String }
});

let ResumeSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    address: { type: String },
    zip: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    mail: { type: String },
    site: { type: String },
    skype: { type: String },
    sex: { type: String },
    birth: { type: Date },
    nationality: { type: String },
    type: { type: String },
    description: { type: String },
    educations: [EducationSchema],
    works: [WorkSchema],
    native: { type: String },
    foreigns: [ForeignLanguageSchema],
    commSkills: { type: String },
    commAttachment: { type: String },
    orgSkills: { type: String },
    orgAttachment: { type: String },
    jobSkills: { type: String },
    jobAttachment: { type: String },
    digitalInformation: { type: String },
    digitalCommunication: { type: String },
    digitalContent: { type: String },
    digitalProblem: { type: String },
    digitalCertificate: { type: String },
    digitalSkills: { type: String },
    digitalAttachment: { type: String }
});

let StudentSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        phone: { type: String },
        mail: { type: String },
        year: { type: Number },
        graduated: { type: Boolean },
        profile: { type: String },
        resume: { type: ResumeSchema }
    },
    {
        discriminatorKey: 'type'
    }
);

export interface ForeignLanguageInterface {
    name: String;
    listening: String;
    reading: String;
    interaction: String;
    production: String;
    writing: String;
    diploma: String;
    attachment: String;
}

export interface EmployerInterface {
    name: String;
    city: String;
    country: String;
    address: String;
    zip: String;
    site: String;
    sector: String;
}

export interface WorkInterface {
    from: Date;
    to: Date;
    ongoing: Boolean;
    format: String;
    position: String;
    employer: EmployerInterface;
    activities: String;
    attachment: String;
}

export interface OrganisationInterface {
    name: String;
    city: String;
    country: String;
    address: String;
    zip: String;
    site: String;
    eqf: Number;
}

export interface EducationInterface {
    from: Date;
    to: Date;
    ongoing: Boolean;
    format: String;
    qualification: String;
    organisation: OrganisationInterface;
    subjects: String;
    field: String;
    attachment: String;
}

export interface ResumeInterface {
    firstname: String;
    lastname: String;
    address: String;
    zip: String;
    city: String;
    country: String;
    phone: String;
    mail: String;
    site: String;
    skype: String;
    sex: String;
    birth: Date;
    nationality: String;
    type: String;
    description: String;
    educations: EducationInterface[];
    works: WorkInterface[];
    native: String;
    foreigns: ForeignLanguageInterface[];
    commSkills: String;
    commAttachment: String;
    orgSkills: String;
    orgAttachment: String;
    jobSkills: String;
    jobAttachment: String;
    digitalInformation: String;
    digitalCommunication: String;
    digitalContent: String;
    digitalProblem: String;
    digitalCertificate: String;
    digitalSkills: String;
    digitalAttachment: String;
}

export interface StudentInterface extends UserInterface {
    firstname: String;
    lastname: String;
    phone: String;
    mail: String;
    year: Number;
    graduated: Boolean;
    profile: String;
    resume: ResumeInterface;
}

export const Student = User.discriminator<StudentInterface>('student', StudentSchema);
export default Student;