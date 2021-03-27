const mongoose = require("mongoose");
module.exports = {
	connection: () => {
		const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/backend-facerecognition';
		mongoose.connect(uri, {
		  useNewUrlParser: true,
		  useUnifiedTopology: true,
		  useFindAndModify: false,
		});
		const connection = mongoose.connection;
		connection.once("open", () => {
  			console.log("MongoDB databse connection enstablished successfully");
		});
	}
}