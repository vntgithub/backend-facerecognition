const Group = require('../models/group.model');

module.exports = {
    add: async ( req, res) => {
        const newGroup = new Group(req.body);
        await Group.create(newGroup)
        .then(() => res.json("Group added!"))
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
        const idNeedDelete = req.body.id;
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
    getGroupsByArrayId: (req, res) => {
        const arrayId = [...req.body];
        await Group.find({'_id': { $in: arrayId }})
        .then(groups => {
            if(groups){
                res.json(groups)
            }else{
                res.json([]);
            }
        })
        .catch(err => console.log(err));
    },
}