import express from 'express';
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
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ 'username': username, 'password': password }, (err, user) => {
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
                    Student.create([req.body.user], (err, student) => {
                        if (err) console.log(err);
                        else res.json(student);
                    });
                    break;
                }
                case "company": {
                    Company.create([req.body.user], (err, company) => {
                        if (err) console.log(err);
                        else res.json(company);
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

router.route('/reset').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    User.findOneAndUpdate({ 'username': username, 'password': password }, { $set: { 'password': newPassword } }, (err, user) => {
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