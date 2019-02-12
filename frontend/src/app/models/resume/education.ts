import { Organisation } from './organisation';

export class Education {
    from: Date;
    to: Date;
    ongoing: Boolean;
    format: String;
    qualification: String;
    organisation: Organisation;
    subjects: String;
    field: String;
    attachment: String;
}