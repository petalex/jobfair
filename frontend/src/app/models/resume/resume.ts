import { Education } from './education';
import { Work } from './work';
import { ForeignLanguage } from './foreign-language';

export class Resume {
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
    educations: Education[];
    works: Work[];
    native: String;
    foreigns: ForeignLanguage[];
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