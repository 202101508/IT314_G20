const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/hostelEase");

const recordSchema = new Schema({
	Id: Number,
	Status: String,
	Date: Date,
});

const Record = mongoose.model("Record", recordSchema);

//Fetching records
async function fetchRecords() {
	try {
		const records = await Record.find();
		return records;
	} catch (error) {
		// Handle any errors that might occur during the database query
		throw error;
	}
}
exports.fetchRecords = fetchRecords;

//Inbox schema
const inboxSchema = new Schema({
	studName: String,
	studId: String,
	reasonForVisit: String,
});

const Inbox = mongoose.model("Inbox", inboxSchema);

//Fetching inbox
async function fetchInbox() {
	try {
		const inbox = await Inbox.find();
		return inbox;
	} catch (err) {
		throw err;
	}
}
exports.fetchInbox = fetchInbox;


// const model = require("./data");

// model.addInbox(Inbox);
// model.addRecords(Record);
