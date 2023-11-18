const { addAdminDetails, updateAdminDetails } = require("../data");
var {
	User,
	adminDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
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

	

	app.get("/admin/:uName/help", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/help", { username: username });
	});
};
