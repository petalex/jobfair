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
const usertype_1 = __importDefault(require("./models/usertype"));
const student_1 = __importDefault(require("./models/student"));
const admin_1 = __importDefault(require("./models/admin"));
const company_1 = __importDefault(require("./models/company"));
const field_1 = __importDefault(require("./models/field"));
router.route('/usertypes').get((req, res) => {
    usertype_1.default.find({}, (err, usertypes) => {
        if (err)
            console.log(err);
        else
            res.json(usertypes);
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
    let type = req.body.type;
    let User = null;
    switch (type) {
        case 'student': {
            User = student_1.default;
            break;
        }
        case 'admin': {
            User = admin_1.default;
            break;
        }
        case 'company': {
            User = company_1.default;
            break;
        }
    }
    User.findOne({ 'username': username, 'password': password }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
/*
router.route('/register').post((req, res) => {
    let student = new Student(req.body);
    let type = req.body.type;

    let user = null;
    switch (type) {
        case 'student': {
            User = Student;
            break;
        }
        case 'admin': {
            User = Admin;
            break;
        }
        case 'company': {
            User = Company;
            break;
        }
    }

    student.save()
            .then(student => {
                res.status(200).json({ 'succesful': 'yes' });
            })
            .catch(err => {
                res.status(400).json({ 'succesful': 'no' });
            });
});

router.route('/reset/student').post((req, res) => {
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