const express = require("express");
const cors = require("cors");
const mongodb = require("./mongodb.js");
const bodyParser = require('body-parser');
require("dotenv").config();


const adminRoute = require('./routes/admin.route');
// const teacherRoute = require('./routes/teacher.route');
// const courseRoute = require('./routes/course.route');
// const groupRoute = require('./routes/group.route');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/admin', adminRoute);

mongodb.connection();


app.get("/", (req, res) => {
    res.send("Back end face recognition");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})