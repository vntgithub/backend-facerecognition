const Course = require('../models/course.model');

module.exports = {
    getByTeacherId: async (req, res) => {
        const teacherId = req.params.teacherId;
        Course.find({ teacherId: teacherId})
        .then(courses => res.json(courses))
        .catch(err => console.log(err))
    },
    add: async (req, res) => {
        const lessons = [...req.body.lessons];
        await Course.create({...req.body, lessons: lessons})
        .then(course => res.json(course))
    },
    update: async (req, res) => {
        Course.findByIdAndUpdate(req.body['_id'], req.body)
        .then(() => res.json('Updated!'))
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
    },
    checkCodeExist: async (req, res) => {
        const code = req.params.code;
        await Course.findOne({code: code})
        .then(course => {
            if(course)
                res.json(false)
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    getById: async (req, res) => {
        const id = req.params.id;
        await Course.findById(id)
        .then(course => res.json(course['_doc']))
        .catch(err => res.json(err))
    }
}