const Course = require('../models/course.model');

module.exports = {
    getByTeacherId: async (req, res) => {
        const teacherId = req.params.teacherId;
        Course.find({ teacherId: teacherId})
        .then(courses => res.json(courses))
        .catch(err => console.log(err))
    },
    create: async (req, res) => {
        const newCourse = req.body;
        const newCourse = await Course.create(newCourse);
        res.json("Course created!");
    },
    update: async (req, res) => {
        const idCourseNeedUpdate = req.params.id;
        Course.findById(idCourseNeedUpdate)
        .then(course => {
            const newcourse = req.body;
            course = {...newcourse}
            res.json("Updated!");
        })
        .catch(err => console.log(err))
    },
    delete: async (req, res) => {
        const idCourseNeeddDelete = req.params.id;
        Course.findByIdAndDelete(idCourseNeeddDelete)
        .then(() => res.json("Deleted!"))
        .catch(err => console.log(err))
    },
    findByCode: async (req, res) => {
        const name = req.params.name;
        Course.find({name: name})
        .then(course => res.json(course))
        .catch(err => console.log(err));
    }
}