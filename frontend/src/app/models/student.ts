import { Resume } from './resume/resume';

export class Student {
    type: String = "student";
    username: String;
    password: String;
    firstname: String;
    lastname: String;
    phone: String;
    mail: String;
    year: Number;
    graduated: Boolean = false;
    profile: String;
    resume: Resume;
}