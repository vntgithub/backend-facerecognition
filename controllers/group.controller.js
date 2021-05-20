const Group = require('../models/group.model');
const Class = require('../models/class.model');

module.exports = {
    add: async ( req, res) => {
        const newClass = await Class.create({data: []})

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
    //Need teacher id
    // getGroupByFilter: async(req, res) => {
    //     const filter = req.body.filter;
    //     const arrayId = [...req.body.arrayId];
    //     await Group.find({
    //         '_id': { $in: arrayId }, 
    //         'year': filter.year, 
    //         'semester': filter.semester,
    //         'isDone': filter.state
    //     })
    //     .then(groups => {
    //         if(groups){
    //             res.json(groups)
    //         }else{
    //             res.json([]);
    //         }
    //     })
    //     .catch(err => console.log(err));
    // },
    // getGroupsByArrayId: (req, res) => {
    //     const arrayId = [...req.body];
    //     await Group.find({'_id': { $in: arrayId }})
    //     .then(groups => {
    //         if(groups){
    //             res.json(groups)
    //         }else{
    //             res.json([]);
    //         }
    //     })
    //     .catch(err => console.log(err));
    // },
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
        console.log(req.body)
        await Group.find(req.body)
        .then(group => {
            console.log(group.length)
            if(group.length > 0)
                res.json(false);
            else
                res.json(true)
        })
        .catch(err => res.json(err))
    }
}