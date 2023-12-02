var { User } = require("./dataBase");

//Update Student Details
function updateStudentDetails(data, formData) {
	data.student_name = formData.student_name;
	data.student_id = formData.student_id;
	data.academic_year = formData.academic_year;
	data.batch = formData.batch;
	data.email = formData.email;
	data.gender = formData.gender;
	data.blood_group = formData.blood_group;
	data.mobile_no = formData.mobile_no;

	data.save().then(() => {
		console.log("form data updated!");
	});
}

//Add new Student Details
function addStudentDetails(studDetails, username, data) {
	studDetails
		.insertMany([
			{
				student_name: data.student_name,
				student_id: data.student_id,
				academic_year: data.academic_year,
				batch: data.batch,
				email: data.email,
				gender: data.gender,
				blood_group: data.blood_group,
				mobile_no: data.mobile_no,
			},
		])
		.then(async (savedStudent) => {
			try {
				const result2 = await User.findOneAndUpdate(
					{ username: username },
					{ $set: { studDetails: savedStudent[0]._id } },
					{ new: true, runValidators: true }
				).populate("studDetails");

				if (result2) {
					console.log("User updated:", result2);
					console.log(result2.studDetails);
				} else {
					console.log("User not found.");
				}
			} catch (error) {
				console.error(error);
			}
		});
}

//Update Admin Details
function updateAdminDetails(data, formData) {
	data.name = formData.name;
	data.id = formData.id;
	data.joining_year = formData.joining_year;
	data.email = formData.email;
	data.gender = formData.gender;
	data.blood_group = formData.blood_group;
	data.mobile_no = formData.mobile_no;

	data.save().then(() => {
		console.log("form data updated!");
	});
}

//Add new Admin Details
function addAdminDetails(adminDetails, username, data) {
	adminDetails
		.insertMany([
			{
				name: data.name,
				id: data.id,
				joining_year: data.joining_year,
				email: data.email,
				gender: data.gender,
				blood_group: data.blood_group,
				mobile_no: data.mobile_no,
			},
		])
		.then(async (savedAdmin) => {
			try {
				const result2 = await User.findOneAndUpdate(
					{ username: username },
					{ $set: { adminDetails: savedAdmin[0]._id } },
					{ new: true, runValidators: true }
				).populate("adminDetails");

				if (result2) {
					console.log("User updated:", result2);
					console.log(result2.adminDetails);
				} else {
					console.log("User not found.");
				}
			} catch (error) {
				console.error(error);
			}
		});
}

//Add new Request in Request Box
function addRequest(reqBox, data, uid) {
	const currDate = new Date();
	reqBox
		.insertMany([
			{
				User: uid,
				subject: data.subject,
				reqMessage: data.request,
				confirmation: "Pending",
				reqDate:
					currDate.toDateString() + " at " + currDate.toLocaleTimeString(),
				confDate: "-",
			},
		])
		.then(() => {
			console.log("New request Added in request Box by user: ", uid);
		});
}

//Add new Event in upcoming events
function addEvent(Event, events, uid) {
	Event.insertMany([
		{
			title: events.title,
			description: events.description,
			timestamp: events.timestamp,
		},
	])
		.then(() => {
			console.log("New event Added in upcoming events by user: ", uid);
		})
		.catch((err) => {
			if (err) throw err;
		});
}

//Add new Visitation Permission Request
function vp_addRequest(vp_reqBox, data, uid) {
	vp_reqBox
		.insertMany([
			{
				User: uid,
				purpose: data.purpose,
				arrivalDate: data.arrivalDate,
				arrivalTime: data.arrivalTime,
				depTime: data.depTime,
				confirmation: "Pending",
				visitors: [data.visitors[0], data.visitors[1]],
			},
		])
		.then(() => {
			console.log("New VP request Added by user: ", uid);
		});
}

module.exports = {
	addStudentDetails,
	updateStudentDetails,
	addAdminDetails,
	updateAdminDetails,
	addRequest,
	vp_addRequest,
	addEvent,
};
