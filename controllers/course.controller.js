const Course = require('../models/course.model');

module.exports = {
    getByTeacherId: async (req, res) => {
        const teacherId = req.params.teacherId;
        Course.find({ teacherId: teacherId})
        .then(courses => res.json(courses))
        .catch(err => console.log(err))
    },
    add: async (req, res) => {
        const newCourse = {...req.body, lessons: [...req.body.lessons]};
        await Course.create(newCourse);
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
        const code = req.params.code;
        Course.find({code: {$regex: new RegExp(".*" + code.toLowerCase() + ".*", "i")}})
        .then(course => res.json(course))
        .catch(err => console.log(err));
    },
    findByName: async (req, res) => {
        const name = req.params.name;
        await Course.find({name: name})
        .then(courses => {
            if(courses){
                res.json(courses);
            }else{
                res.json('Not found');
            }
        })
        .catch(err => console.log(err));
    }
}