const { addAdminDetails, updateAdminDetails, addEvent } = require("../data");
var {
	User,
	adminDetailSchema,
	studDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
	Event,
} = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/home", { username: username });
	});

	app.get("/admin/:uName/emergency_contacts", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/emergency_contacts", { username: username });
	});

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
