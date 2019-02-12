import { Employer } from './employer';

export class Work {
    from: Date;
    to: Date;
    ongoing: Boolean;
    format: String;
    position: String;
    employer: Employer;
    activities: String;
    attachment: String;
}