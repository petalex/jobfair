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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express_1.default.static('uploads'));
;
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
    user_1.default.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/register').post((req, res) => {
    user_1.default.findOne({ 'username': req.body.user.username }, (err, user) => {
        if (err)
            console.log(err);
        else if (user)
            res.json(null);
        else {
            switch (req.body.user.type) {
                case "student": {
                    student_1.default.create([req.body.user], (err, students) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(students[0]);
                    });
                    break;
                }
                case "company": {
                    company_1.default.create([req.body.user], (err, companies) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(companies[0]);
                    });
                    break;
                }
                default: {
                    res.json(null);
                    break;
                }
            }
        }
    });
});
router.route('/upload/image').post(upload.single('image'), (req, res) => {
    switch (req.body.type) {
        case "student": {
            student_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'profile': req.file.path } }, (err, student) => {
                if (err)
                    console.log(err);
                else
                    res.json(student);
            });
            break;
        }
        case "company": {
            company_1.default.findOneAndUpdate({ 'username': req.body.username }, { $set: { 'logo': req.file.path } }, (err, company) => {
                if (err)
                    console.log(err);
                else
                    res.json(company);
            });
            break;
        }
    }
});
router.route('/reset').post((req, res) => {
    user_1.default.findOneAndUpdate({ 'username': req.body.username, 'password': req.body.password }, { $set: { 'password': req.body.password } }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/companies').post((req, res) => {
    let conditions = JSON.parse(JSON.stringify(req.body, (key, value) => {
        if (value == "" || value == null)
            return undefined;
        return value;
    }));
    company_1.default.find(conditions, (err, companies) => {
        if (err)
            console.log(err);
        else
            res.json(companies);
    });
});
app.use('/', router);
app.listen(4000, () => {
    console.log('[Server] Running on port 4000.');
});
//# sourceMappingURL=server.js.map