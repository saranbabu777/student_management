const express = require('express');
const studentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the students.
studentRoutes.route('/student').get((req, res) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection('students')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        })
})

// This section will help you get a single student by id
studentRoutes.route('/student/:id').get((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("students")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
})

// This section will help you create a new student.
studentRoutes.route("/student/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        doj: req.body.doj,
        dob: req.body.dob,
        phone: req.body.phone,
        fees: req.body.fees ? req.body.fees : []
    };
    db_connect.collection("students").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a student by id.
studentRoutes.route("/student/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            doj: req.body.doj,
            dob: req.body.dob,
            phone: req.body.phone,
            fees: req.body.fees
        },
    }
    db_connect.collection("students").updateOne(myquery, newvalues, function (err, obj) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(obj);
    })
});

// This section will help you delete a student
studentRoutes.route("/student/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("students").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = studentRoutes;