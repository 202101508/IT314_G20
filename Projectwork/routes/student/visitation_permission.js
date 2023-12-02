const { vp_addRequest } = require("../data");
var { User, vp_reqBox } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/student/:uName/visitation", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (user) {
				const requests = await vp_reqBox.find({}).populate("User");
				if (requests.length !== 0) {
					res.render("student/visitation", {
						username: username,
						data: requests,
						id: user._id,
					});
				} else {
					res.render("student/visitation", { username: username });
				}
			} else {
				console.log("User Not Found!");
				return;
			}
		} catch (error) {
			console.error(error);
			return;
		}
	});

	app.get(
		"/student/:uName/visitation/visitation_button",
		authenticateUser,
		(req, res) => {
			var username = req.params.uName;
			res.render("student/visitation_button", { username: username });
		}
	);

	app.post(
		"/student/:uName/visitation/visitation_button",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			const formData = req.body;

			try {
				const user = await User.find({ username: username }, { _id: true });
				console.log(user[0]);
				if (user) {
					vp_addRequest(vp_reqBox, formData, user[0]._id);
				} else {
					console.log("User Not Found!");
				}
			} catch (error) {
				console.error(error);
			}
			res.redirect(`/student/${username}/visitation`);
		}
	);
};
