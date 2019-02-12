"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const Schema = mongoose_1.default.Schema;
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
let StudentSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    mail: { type: String },
    year: { type: Number },
    graduated: { type: Boolean },
    profile: { type: String },
    resume: { type: ResumeSchema }
}, {
    discriminatorKey: 'type'
});
exports.Student = user_1.default.discriminator('student', StudentSchema);
exports.default = exports.Student;
//# sourceMappingURL=student.js.map