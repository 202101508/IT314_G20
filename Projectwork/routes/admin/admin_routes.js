const { addAdminDetails, updateAdminDetails } = require("../data");
var { User, adminDetailSchema, reqBox, vp_reqBox } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/home", { username: username });
	});

	app.get("/admin/:uName/emergency_contacts", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/emergency_contacts", { username: username });
	});

	app.get("/admin/:uName/fee_receipt", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/fee_receipt", { username: username });
	});

	app.get("/admin/:uName/help", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/help", { username: username });
	});
};
