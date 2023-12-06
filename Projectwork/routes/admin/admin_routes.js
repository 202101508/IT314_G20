const { addAdminDetails, updateAdminDetails, addEvent } = require("../data");
var {
	User,
	adminDetailSchema,
	studDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
	Event,
	emergencyContacts,
} = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/home", { username: username });
	});

	app.get(
		"/admin/:uName/emergency_contacts",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await emergencyContacts.find({});
				console.log("Result: ", result);
				if (result) {
					res.render("admin/emergency_contacts", {
						username: username,
						result: result[0],
					});
				} else {
					res.render("admin/emergency_contacts", {
						username: username,
					});
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);

	app.get(
		"/admin/:uName/emergency_contacts_edit",
		authenticateUser,
		(req, res) => {
			var username = req.params.uName;
			res.render("admin/emergency_contacts_edit", { username: username });
		}
	);

	app.post(
		"/admin/:uName/emergency_contacts_edit",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			console.log(req.body);
			try {

				const results = await emergencyContacts.find({});
				let result = results[0];
				if (result) {
						result.manager_name = req.body.manager_name;
						result.manager_contact = req.body.manager_contact;
						result.so_name = req.body.so_name;
						result.so_contact = req.body.so_contact;
						result.me_name = req.body.me_name;
						result.me_contact = req.body.me_contact;

						result.save().then(()=>{
							console.log("Saved.");
						})
				} else {
					emergencyContacts
					.insertMany({
						manager_name: req.body.manager_name,
						manager_contact: req.body.manager_contact,
						so_name: req.body.so_name,
						so_contact: req.body.so_contact,
						me_name: req.body.me_name,
						me_contact: req.body.me_contact,
					})
					.then(() => {
						console.log("Success.");
						
					});
				}

				res.redirect(`/admin/${username}/emergency_contacts`);

				
			} catch (err) {
				if (err) throw err;
			}
		}
	);

	app.get(
		"/admin/:uName/upcoming_events",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await Event.find({});
				console.log("Events: ", result);

				if (result.length !== 0) {
					res.render("admin/upcoming_events", {
						username: username,
						events: result,
					});
				} else {
					res.render("admin/upcoming_events", { username: username });
				}
			} catch (err) {
				if (err) throw err;
				return;
			}
		}
	);

	app.post("/admin/:uName/add-event", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		console.log(req.body);
		try {
			const user = await User.findOne({ username: username }, { _id: true });

			addEvent(Event, req.body, user._id);
		} catch (err) {
			if (err) throw err;
			return;
		}
		res.redirect(`/admin/${username}/upcoming_events`);
	});

	app.get("/admin/:uName/help", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/help", { username: username });
	});
};
