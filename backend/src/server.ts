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
import Company from './models/company';
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

router.route('/companies').post((req, res) => {
    let conditions = JSON.parse(JSON.stringify(req.body, (key, value) => {
        if (value == "" || value == null) return undefined;
        return value;
    }));
    Company.find(conditions, (err, companies) => {
        if (err) console.log(err);
        else res.json(companies);
    });
});

app.use('/', router);

app.listen(4000, () => {
    console.log('[Server] Running on port 4000.');
});