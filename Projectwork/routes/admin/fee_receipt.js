var { User, Receipt } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	//Show All fee receipts
	app.get("/admin/:uName/fee_receipt", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		const receipts = await Receipt.find({});
		if (receipts.length !== 0) {
			console.log(receipts);
			res.render("admin/fee_receipt", {
				username: username,
				receipts: receipts,
			});
		} else {
			console.log("Not found!");
			res.render("admin/fee_receipt", { username: username });
		}
	});

	// Route to add a new receipt
	app.get("/admin/:uName/add-receipt", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/add_fee_receipt", { username: username });
	});

	app.post("/admin/:uName/add-receipt", authenticateUser, async (req, res) => {
		const { username, semester, feePayment, date } = req.body;

		try {
			const user = await User.findOne({ username: username });

			if (user && user.isAdmin !== "on") {
				const userid = user._id;
				const newReceipt = new Receipt({
					userid,
					username,
					semester,
					feePayment,
					date,
				});
				await newReceipt.save();
				res.redirect(`/admin/${username}/fee_receipt`);
			} else {
				console.log("User Not found!");
				res.render("admin/add_fee_receipt", {
					username: username,
					msg: "User Not Found!",
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	});

	// Route to remove a receipt
	app.get(
		"/admin/:uName/remove-receipt/:id",
		authenticateUser,
		async (req, res) => {
			const username = req.params.uName;
			try {
				await Receipt.findByIdAndRemove(req.params.id);
				res.redirect(`/admin/${username}/fee_receipt`);
			} catch (error) {
				console.error(error);
				res.status(500).send("Internal Server Error");
			}
		}
	);
};
