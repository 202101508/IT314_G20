var { User, Receipt } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/student/:uName/fee_receipt", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const receipts = await Receipt.find({
				userid: user._id,
			});

			if (receipts.length === 0) {
				console.log("No Receipt found!");
				res.redirect("");
			}
			res.render("student/fee_receipt", { username: username, receipts: receipts });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	app.post(
		"/student/:uName/receipts",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			console.log(req.body);
			try {
				const semester = req.body.semester;

				const user = await User.findOne({ username: username });
				if (!user) {
					return res.status(404).json({ error: "User not found" });
				}

				const receipts = await Receipt.find({
					userid: user._id,
					semester: semester,
				});

				if (receipts.length === 0) {
					console.log("No Receipt found!");
					res.render;
				}

				// Generate PDF and send as a download
				const pdfDoc = new PDFDocument();
				const pdfPath = `./temp/receipts_${userId}_${semester}.pdf`; // Adjust the path as needed

				pdfDoc.pipe(fs.createWriteStream(pdfPath));

				pdfDoc
					.fontSize(16)
					.text(`Receipts for ${user.username}, Semester: ${semester}`, {
						align: "center",
					});
				pdfDoc.moveDown();

				receipts.forEach((receipt, index) => {
					pdfDoc.text(`Receipt #${index + 1}`);
					pdfDoc.text(`Date: ${receipt.date}`);
					// Include other receipt details as needed

					pdfDoc.moveDown();
				});

				pdfDoc.end();

				res.setHeader("Content-Type", "application/pdf");
				res.setHeader(
					"Content-Disposition",
					`attachment; filename=receipts_${userId}_${semester}.pdf`
				);

				const stream = fs.createReadStream(pdfPath);
				stream.pipe(res);

				res.redirect(`/student/${username}/fee_receipt`);

				// Optionally, you can delete the generated PDF file after sending it to the client
				// fs.unlinkSync(pdfPath);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	);
};
