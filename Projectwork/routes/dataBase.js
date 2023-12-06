const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

(async () => {
	await mongoose.connect(process.env.MONGO_URI);
})();

//Student Details Schema
const studentDetailsSchema = new Schema({
	student_name: String,
	student_id: String,
	room_no: String,
	academic_year: String,
	batch: String,
	email: String,
	gender: String,
	blood_group: String,
	mobile_no: String,
});

const studDetailSchema = mongoose.model("studDetails", studentDetailsSchema);

//Emergency Contacts
const emergencyContactsSchema = new Schema({
	manager_name: String,
	manager_contact: String,
	so_name: String,
	so_contact: String,
	me_name: String,
	me_contact: String,
});

const emergencyContacts = mongoose.model(
	"emergencycontact",
	emergencyContactsSchema
);

//Admin Details Schema
const adminDetailsSchema = new Schema({
	name: String,
	id: String,
	joining_year: String,
	email: String,
	gender: String,
	blood_group: String,
	mobile_no: String,
});

const adminDetailSchema = mongoose.model("adminDetails", adminDetailsSchema);

//User schema
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	isAdmin: {
		type: String,
		default: "off",
	},
	studDetails: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "studDetails",
	},
	adminDetails: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "adminDetails",
	},
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

//Student Requests Schema
const requestSchema = new Schema({
	User: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	subject: String,
	reqMessage: String,
	confirmation: String,
	reqDate: String,
	confDate: String,
});

const reqBox = mongoose.model("reqBox", requestSchema);

//Visitation Pass Requests
const vpRequestSchema = new Schema({
	User: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	purpose: String,
	arrivalDate: String,
	arrivalTime: String,
	depTime: String,
	confirmation: String,
	visitors: [String],
});

const vp_reqBox = mongoose.model("vp_reqBox", vpRequestSchema);

//Fee Receipt Schema
const receiptSchema = new mongoose.Schema({
	userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	username: String,
	semester: String,
	feePayment: String,
	date: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

// Create a Mongoose schema for events
const eventSchema = new mongoose.Schema({
	title: String,
	description: String,
	timestamp: Date,
}); // Create a Mongoose model

eventSchema.index({ timestamp: 1 }, { expireAfterSeconds: 1 * 24 * 60 * 60 });
// Create a Mongoose model
const Event = mongoose.model("Event", eventSchema);

module.exports = {
	User,
	studDetailSchema,
	adminDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
	Event,
	emergencyContacts,
};
