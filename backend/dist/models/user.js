"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let UserSchema = new Schema({
    username: { type: String },
    password: { type: String }
}, {
    discriminatorKey: 'type'
});
exports.User = mongoose_1.default.model('user', UserSchema);
exports.default = exports.User;
//# sourceMappingURL=user.js.map