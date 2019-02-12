import { Participant } from './participant';

export interface Contest {
    type: String;
    title: String;
    info: String;
    deadline: Date;
    files: String[];
    participants: Participant[];
    company: String;
}