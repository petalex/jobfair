"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Field;
(function (Field) {
    Field[Field["IT"] = 0] = "IT";
    Field[Field["Telecommunication"] = 1] = "Telecommunication";
    Field[Field["Energetics"] = 2] = "Energetics";
    Field[Field["CivilArchitecture"] = 3] = "CivilArchitecture";
    Field[Field["MechanicalEngineering"] = 4] = "MechanicalEngineering";
})(Field = exports.Field || (exports.Field = {}));
let User = new Schema({
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
        type: Field
    },
    specialty: {
        type: String
    },
    logo: {
        type: String
    }
});
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=company.js.map