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

    User.findOne({ 'username': username, 'password': password }).exec((err, user) => {
        if (err) console.log(err);
        else {
            res.json(user);
            return;
        }
    });
});

router.route('/register/student').post((req, res) => {
    let student = new Student(req.body.user);

    student.save()
            .then((student: any) => {
                res.status(200).json({ 'succesful': 'yes' });
            })
            .catch((err: any) => {
                res.status(400).json({ 'succesful': 'no' });
            });
});

router.route('/register/company').post((req, res) => {
    let company = new Company(req.body.user);

    company.save()
            .then((company: any) => {
                res.status(200).json({ 'succesful': 'yes' });
            })
            .catch((err: any) => {
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