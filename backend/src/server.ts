import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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

import Usertype from './models/usertype';
import Student from './models/student';
import Admin from './models/admin';
import Company from './models/company';
import Field from './models/field';

router.route('/usertypes').get((req, res) => {
        Usertype.find({}, (err, usertypes) => {
            if (err) console.log(err);
            else res.json(usertypes);
        });
    }
);

router.route('/fields').get((req, res) => {
        Field.find({}, (err, fields) => {
            if (err) console.log(err);
            else res.json(fields);
        });
    }
);

router.route('/login').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;

        let User = null;
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

        User.findOne({ 'username': username, 'password': password }, (err, student) => {
            if (err) console.log(err);
            else res.json(student);
        });
    }
);
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