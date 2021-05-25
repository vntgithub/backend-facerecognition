const Student_Group = require('../models/student_group');

module.exports = {
	getByStudentId: async (req, res) => {
		const studentId = req.params.id;
		await Student_Group.find({studentId: studentId})
		.then(rs => res.json(rs[0]))
		.catch(err => console.log(err))
	},
	joinGroup: async (req, res) => {
		const {studentId, groupId} = req.body;
		await Student_Group.find({studentId: studentId})
		.then(rs => {
			rs[0].groups.push(groupId);
			rs[0].save();
		})
		.catch(err => console.log(err))
	},
	leaveGroup: async (req, res) => {
		const {studentId, groupId} = req.body;
		await Student_Group.find({studentId: studentId})
		.then(rs => {
			const index = rs[0].groups.indexOf(groupId);
			rs[0].groups.splice(index, 1);
			rs[0].save();
		})
		.catch(err => console.log(err))
	},
	add: async (req, res) => {
		studentId = req.body.id;
		const newStudentGroup = new Student_Group({studentId: studentId, groups: []})
		await Student_Group.create(newStudentGroup)
		.then(rs => res.json(rs))
		.catch(err => console.log(err))
	}
}