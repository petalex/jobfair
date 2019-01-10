import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jobfair');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('[Server] Succesfully connected to Mongo.');
});

const router = express.Router();

import Student from './models/student';
import Admin from './models/admin';
import Company from './models/company';

router.route('/usertypes').get((req, res) => {
        const UserTypes: String[] = [
            "Student", 
            "Administrator", 
            "Company"
        ];

        res.json(UserTypes);
    }
);

router.route('/login/student').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        Student.findOne({ 'username': username, 'password': password }, (err, student) => {
            if (err) console.log(err);
            else res.json(student);
        });
    }
);

router.route('/register/student').post((req, res) => {
    let student = new Student(req.body);

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