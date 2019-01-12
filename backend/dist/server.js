"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/jobfair', { useNewUrlParser: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('[Server] Succesfully connected to Mongo.');
});
const router = express_1.default.Router();
const user_1 = __importDefault(require("./models/user"));
const student_1 = __importDefault(require("./models/student"));
const company_1 = __importDefault(require("./models/company"));
const field_1 = __importDefault(require("./models/field"));
const type_1 = __importDefault(require("./models/type"));
router.route('/types').get((req, res) => {
    type_1.default.find({}, (err, types) => {
        if (err)
            console.log(err);
        else
            res.json(types);
    });
});
router.route('/fields').get((req, res) => {
    field_1.default.find({}, (err, fields) => {
        if (err)
            console.log(err);
        else
            res.json(fields);
    });
});
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }).exec((err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
            return;
        }
    });
});
router.route('/register/student').post((req, res) => {
    let student = new student_1.default(req.body.user);
    student.save()
        .then((student) => {
        res.status(200).json({ 'succesful': 'yes' });
    })
        .catch((err) => {
        res.status(400).json({ 'succesful': 'no' });
    });
});
router.route('/register/company').post((req, res) => {
    let company = new company_1.default(req.body.user);
    company.save()
        .then((company) => {
        res.status(200).json({ 'succesful': 'yes' });
    })
        .catch((err) => {
        res.status(400).json({ 'succesful': 'no' });
    });
});
/*
router.route('/reset').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newPassword = req.body.newPassword;

    Student.findOneAndUpdate({ 'username': username, 'password': password }, { $set: { 'password': newPassword } })
            .then(student => {
                res.status(200).json({ 'succesful': 'yes' });
            })
            .catch(err => {
                res.status(400).json({ 'succesful': 'no' });
            });
});*/
app.use('/', router);
app.listen(4000, () => {
    console.log('[Server] Running on port 4000.');
});
//# sourceMappingURL=server.js.map