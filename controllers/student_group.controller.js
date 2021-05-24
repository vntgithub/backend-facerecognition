const Student_Group = require('../models/student_group');

module.exports = {
	getByStudentId: async (req, res) => {
		const studentId = req.params.id;
		console.log(studentId)
		// await Student_Group.find({studentId: studentId})
		// .then(rs => res.json(rs.groups))
		// .catch(err => console.log(err))
		res.json([]);
	},
	joinGroup: async (req, res) => {
		const {studentId, groupId} = req.body;
		await Student_Group.find({studentId: studentId})
		.then(rs => {
			rs.groups.push(groupId);
			rs.save();
		})
		.catch(err => console.log(err))
	},
	leaveGroup: async (req, res) => {
		const {studentId, groupId} = req.body;
		await Student_Group.find({studentId: studentId})
		.then(rs => {
			const index = rs.groups.indexOf(groupId);
			rs.groups.splice(index, 1);
			rs.save();
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