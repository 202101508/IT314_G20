const Data = require("./dataBase.js");

module.exports = function (app, authenticateUser) {
	app.get("/inbox", authenticateUser, (req, res) => {
		(async () => {
			try {
				const inbox = await Data.fetchInbox();
				res.render("vp_admin_inbox.ejs", { inbox });
			} catch (err) {
				throw err;
			}
		})();
	});

	app.get("/records", authenticateUser, (req, res) => {
		(async () => {
			try {
				const records = await Data.fetchRecords();
				res.render("vp_admin_records.ejs", { records });
			} catch (err) {
				throw err;
			}
		})();
	});
};
