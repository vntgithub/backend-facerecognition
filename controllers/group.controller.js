const Group = require('../models/group.model');
const Class = require('../models/class.model');

module.exports = {
    add: async ( req, res) => {
        const newClass = await Class.create({data: [], numOfLesson: req.body.lessons.length})
        let newGroup = new Group(req.body);
        newGroup.classId = newClass['_id'];
        await Group.create(newGroup)
        .then(group => res.json(group))
        .catch(err => console.log(err));
    },
    update: async (req, res) => {
        const dataUpdate = {...req.body};
        const idGroupNeedUpdate = dataUpdate['id'];
        delete dataUpdate['_id'];
        await Group.findByIdAndUpdate(idGroupNeedUpdate, dataUpdate)
        .then(() => res.json("Group updated!"))
        .catch(err => console.log(err));
    },
    delete: async (req, res) => {
        const idNeedDelete = req.params.id;
        await Group.findByIdAndDelete(idNeedDelete)
        .then(() => res.json("Group deleted!"))
        .catch(err => console.log(err));
    },
    getByCourseId: async (req, res) => {
        const id = req.params.id;
        await Group.find({courseId: id})
        .then(groups => {
            if(groups.length > 0)
                res.json(groups)
            else
                res.json([])
        })
        .catch(err => res.json(err))
    },
    checkNo: async (req, res) => {
        await Group.findOne(req.body)
        .then(group => {
            if(group)
                res.json(false);
            else
                res.json(true)
        })
        .catch(err => res.json(err))
    },
    getById: async (req, res) => {
        await Group.findById(req.params.id)
        .then(group => res.json(group))
        .catch(err => res.json(err))
    },
    getByArrayId: async (req, res) => {
        const arr = req.body;
        await Group.find({'_id': {$in: arr}})
        .then(groups => res.json(groups))
        .catch(err => console.log(err))
    },
    findByCode: async (req, res) => {
        const code = req.params.code;
        await Group.find({
            codeCourse: {$regex: new RegExp(".*" + code.toLowerCase() + ".*", "i")}
        })
        .then(groups => {
            if(groups.length > 0)
                res.json(groups)
            else
                res.json([])
        })
    },
    endLesson: async (req, res) => {
        const {idGroup, indexLesson} = req.body;
        await Group.findById(id)
        .then(rs => {
            rs.lessons[indexLesson].isDone = true;
            rs.save()
        })
        .catch(err => console.log(err))
    }
}