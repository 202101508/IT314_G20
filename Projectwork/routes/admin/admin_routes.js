module.exports = (app, authenticateUser) => {
	app.get("/admin/home", authenticateUser, (req, res) => {
		res.render("admin/home");
	});

	app.get("/admin/emergency_contacts", authenticateUser, (req, res) => {
		res.render("admin/emergency_contacts");
	});

	app.get("/admin/fee_receipt", authenticateUser, (req, res) => {
		res.render("admin/fee_receipt");
	});

	app.get("/admin/req_box", authenticateUser, (req, res) => {
		res.render("admin/req_box_admin");
	});

	app.get("/admin/req_box_records", authenticateUser, (req, res) => {
		res.render("admin/req_box_records");
	});

	app.get("/admin/my_profile", authenticateUser, (req, res) => {
		res.render("admin/admin_details");
	});

	app.get("/admin/vp_requests", authenticateUser, (req, res) => {
		res.render("admin/vp_requests");
	});

	app.get("/admin/vp_records", authenticateUser, (req, res) => {
		res.render("admin/vp_records");
	});

	app.get("/admin/help", authenticateUser, (req, res) => {
		res.render("admin/help");
	});
};
