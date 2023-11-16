const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/hostelEase");

//User schema
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	isAdmin: String,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

//Records Schema
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
		throw error;
	}
}

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

module.exports = {
	User,
	Record,
	Inbox,
	fetchInbox,
	fetchRecords,
};

// const model = require("./data");

// model.addInbox(Inbox);
// model.addRecords(Record);
