const { addRequest } = require("../data");
var { User, reqBox } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/student/:uName/req_box", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (user) {
				const requests = await reqBox.find({}).populate("User");
				if (requests.length !== 0) {
					res.render("student/req_box.ejs", {
						username: username,
						data: requests,
						id: user._id,
					});
				} else {
					res.render("student/req_box.ejs", { username: username });
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
		"/student/:uName/req_box/req_box_button",
		authenticateUser,
		(req, res) => {
			var username = req.params.uName;
			res.render("student/req_box_button", { username: username });
		}
	);

	app.post(
		"/student/:uName/req_box/req_box_button",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			const formData = req.body;

			try {
				const user = await User.find({ username: username }, { _id: true });
				console.log(user[0]);
				if (user) {
					addRequest(reqBox, formData, user[0]._id);
				} else {
					console.log("User Not Found!");
					return;
				}
			} catch (error) {
				console.error(error);
				return;
			}
			res.redirect(`/student/${username}/req_box`);
		}
	);
};
