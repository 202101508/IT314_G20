import mongoose from "mongoose";
export let records;
export let inbox;
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/admin");

const recordSchema = new Schema({
	Id: Number,
	Status: String,
	Date: Date,
});

const Record = mongoose.model("Record", recordSchema);

Record.insertMany([
	{
		Id: 101,
		Status: "Accepted",
		Date: "2003-12-21",
	},
	{
		Id: 102,
		Status: "Accepted",
		Date: "2003-10-25",
	},
	{
		Id: 103,
		Status: "Declined",
		Date: "2004-12-20",
	},
	{
		Id: 104,
		Status: "Accepted",
		Date: "2004-11-01",
	},
	{
		Id: 105,
		Status: "Declined",
		Date: "2005-5-15",
	},
]).then(() => {
	console.log("Added successfully.");
});

records = await Record.find();

const inboxSchema = new Schema({
	studName: String,
	studId: String,
	reasonForVisit: String,
});

const Inbox = mongoose.model("Inbox", inboxSchema);

Inbox.insertMany([
	{
		studName: "Bhavesh Baraiya",
		studId: "202101241",
		reasonForVisit: "Campus tour",
	},
	{
		studName: "Smeet Agrawal",
		studId: "202101237",
		reasonForVisit: "Hostel and cafeteria inspection",
	},
	{
		studName: "priyesh Tandel",
		studId: "202101222",
		reasonForVisit: "Parent meating",
	},
]);

inbox = await Inbox.find();
