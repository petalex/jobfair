import { Contest } from './contest';

export class Company {
    type: String = "company";
    username: String;
    password: String;
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
    contests: Contest[];
}