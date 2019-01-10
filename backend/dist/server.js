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
mongoose_1.default.connect('mongodb://localhost:27017/jobfair');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('[Server] Succesfully connected to Mongo.');
});
const router = express_1.default.Router();
const student_1 = __importDefault(require("./models/student"));
router.route('/usertypes').get((req, res) => {
    const UserTypes = [
        "Student",
        "Administrator",
        "Company"
    ];
    res.json(UserTypes);
});
router.route('/login/student').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    student_1.default.findOne({ 'username': username, 'password': password }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
router.route('/register/student').post((req, res) => {
    let student = new student_1.default(req.body);
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
    student_1.default.findOneAndUpdate({ 'username': username, 'password': password }, { $set: { 'password': newPassword } })
        .then(student => {
        res.status(200).json({ 'succesful': 'yes' });
    })
        .catch(err => {
        res.status(400).json({ 'succesful': 'no' });
    });
});
/*
router.route('/login/admin').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        Admin.find({'username': username, 'password': password}, (err, admin) => {
            if (err) console.log(err);
            else res.json(admin);
        });
    }
);

router.route('/login/company').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        Company.find({'username': username, 'password': password}, (err, company) => {
            if (err) console.log(err);
            else res.json(company);
        });
    }
);
*/
app.use('/', router);
app.listen(4000, () => {
    console.log('[Server] Running on port 4000.');
});
//# sourceMappingURL=server.js.map