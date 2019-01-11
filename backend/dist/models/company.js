"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Company = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    executive: {
        type: String
    },
    taxid: {
        type: Number
    },
    employees: {
        type: Number
    },
    mail: {
        type: String
    },
    site: {
        type: String
    },
    field: {
        type: String
    },
    specialty: {
        type: String
    },
    logo: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Company', Company);
//# sourceMappingURL=company.js.map