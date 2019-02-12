"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const Schema = mongoose_1.default.Schema;
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
let CompanySchema = new Schema({
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
}, {
    discriminatorKey: 'type'
});
exports.Company = user_1.default.discriminator('company', CompanySchema);
exports.default = exports.Company;
//# sourceMappingURL=company.js.map