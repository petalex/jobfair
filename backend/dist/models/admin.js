"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const Schema = mongoose_1.default.Schema;
let AdminSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    mail: { type: String },
    profile: { type: String }
}, {
    discriminatorKey: 'type'
});
exports.Admin = user_1.default.discriminator('admin', AdminSchema);
exports.default = exports.Admin;
//# sourceMappingURL=admin.js.map