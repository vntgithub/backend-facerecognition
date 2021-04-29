const express = require("express");
const cors = require("cors");
const mongodb = require("./mongodb.js");
const fileUpload = require('express-fileupload');
require("dotenv").config();


const adminRoute = require('./routes/admin.route');
const teacherRoute = require('./routes/teacher.route');
const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const classRoute = require('./routes/class.route');
// const groupRoute = require('./routes/group.route');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/admin', adminRoute);
app.use('/api/teacher', teacherRoute);
app.use('/api/student', studentRoute);
app.use('/api/course', courseRoute);
app.use('/api/class', classRoute);

mongodb.connection();


app.get("/", (req, res) => {
    res.send("Back end face recognition");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})