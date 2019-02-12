import express, { Request } from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jobfair', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('[Server] Succesfully connected to Mongo.');
});

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));

interface FileRequest extends Request {
    username: String;
    file: any;
};

import User from './models/user';
import Student from './models/student';
import Admin from './models/admin';
import Company, { ContestInterface, CompanyInterface } from './models/company';
import Field from './models/field';
import Type from './models/type';

router.route('/types').get((req, res) => {
    Type.find({}, (err, types) => {
        if (err) console.log(err);
        else res.json(types);
    });
});

router.route('/fields').get((req, res) => {
    Field.find({}, (err, fields) => {
        if (err) console.log(err);
        else res.json(fields);
    });
});

router.route('/login').post((req, res) => {
    User.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    });
});

router.route('/register').post((req, res) => {
    User.findOne({ 'username': req.body.user.username }, (err, user) => {
        if (err) console.log(err);
        else if (user) res.json(null);
        else {
            switch (req.body.user.type) {
                case "student": {
                    Student.create([req.body.user], (err, students) => {
                        if (err) console.log(err);
                        else res.json(students[0]);
                    });
                    break;
                }
                case "company": {
                    Company.create([req.body.user], (err, companies) => {
                        if (err) console.log(err);
                        else res.json(companies[0]);
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

router.route('/upload/image').post(upload.single('image'), (req: FileRequest, res) => {
    switch (req.body.type) {
        case "student": {
            Student.findOneAndUpdate({ 'username': req.body.username}, { $set: { 'profile': req.file.path } }, (err, student) => {
                if (err) console.log(err);
                else res.json(student);
            });
            break;
        }
        case "company": {
            Company.findOneAndUpdate({ 'username': req.body.username}, { $set: { 'logo': req.file.path } }, (err, company) => {
                if (err) console.log(err);
                else res.json(company);
            });
            break;
        }
    }
});

router.route('/reset').post((req, res) => {
    User.findOneAndUpdate({ 'username': req.body.username, 'password': req.body.password }, { $set: { 'password': req.body.password } }, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    });
});

router.route('/guest/companies').post((req, res) => {
    interface Conditions {
        name?: RegExp,
        city?: RegExp,
        field?: Array<String>
    }
    let conditions: Conditions = {};
    if (req.body.name != "" && req.body.name != null) {
        conditions.name = new RegExp(".*" + req.body.name + ".*$");
    }
    if (req.body.city != "" && req.body.city != null) {
        conditions.city = new RegExp(".*" + req.body.city + ".*$");
    }
    if (req.body.fields != [] && req.body.fields != null) {
        conditions.field = req.body.fields;
    }
    Company.find(conditions, (err, companies) => {
        if (err) console.log(err);
        else res.json(companies);
    });
});

router.route('/student/resume').post((req, res) => {
    Student.findOne({ username: req.body.username }, (err, student) => {
        if (err) console.log(err);
        else res.json(student.resume);
    });
});

router.route('/student/resume/save').post((req, res) => {
    Student.findOneAndUpdate({ username: req.body.username }, { $set: { 'resume': req.body.resume } }, (err, student) => {
        if (err) console.log(err);
        else res.json(student);
    });
});

router.route('/student/companies').post((req, res) => {
    interface Conditions {
        name?: RegExp
    }
    let conditions: Conditions = {};
    if (req.body.name != "" && req.body.name != null) {
        conditions.name = new RegExp(".*" + req.body.name + ".*$");
    }
    Company.find(conditions, (err, companies) => {
        if (err) console.log(err);
        else res.json(companies);
    });
});

router.route('/student/contests').post((req, res) => {
    interface Conditions {
        name?: RegExp
    }
    let conditions: Conditions = {};
    if (req.body.name != "" && req.body.name != null) {
        conditions.name = new RegExp(".*" + req.body.name + ".*$");
    }
    Company.find(conditions, (err, companies) => {
        if (err) console.log(err);
        else {
            let contests: ContestInterface[] = [];
            let titleRexExp = new RegExp(".*" + req.body.title + ".*$");
            for (let company of companies) {
                for (let contest of company.contests) {
                    if (req.body.types.includes(contest.type) && titleRexExp.test(contest.title.toString())) {
                        contests.push(contest);
                    }
                }
            }
            res.json(contests);
        }
    });
});

router.route('/student/contest/apply').post((req, res) => {
    Company.findOneAndUpdate(
        { 
            name: req.body.contest.company, 
            "contests.type": req.body.contest.type, 
            "contests.title": req.body.contest.title, 
            //"contests.deadline": req.body.contest.deadline  
        },
        { $set: { 'contests.$.participants': req.body.contest.participants } },
        { new: true },
        (err, company) => {
            if (err) console.log(err);
            else res.json(company);
        }
    );
});

router.route('/student/contests/applied').post((req, res) => {
    Company.find({ }, (err, companies) => {
        if (err) console.log(err);
        else {
            let contests: ContestInterface[] = [];
            for (let company of companies) {
                for (let contest of company.contests) {
                    for (let partitipant of contest.participants) {
                        if (partitipant.username === req.body.username) {
                            contests.push(contest);
                            break;
                        }
                    }
                }
            }
            res.json(contests);
        }
    });
});

app.use('/', router);

app.listen(4000, () => {
    console.log('[Server] Running on port 4000.');
});