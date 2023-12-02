var { User, Receipt } = require("../dataBase");
const PDFDocument = require("pdfkit");
const fs = require("fs");

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
				// res.redirect(`/student/${username}/fee_receipt`);
			}
			res.render("student/fee_receipt", {
				username: username,
				receipts: receipts,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	app.post("/student/:uName/receipts", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		const semester = req.body.semester;
		const pdfPath = `./receipts_${username}_${semester}.pdf`;
		console.log(req.body);
		try {
			const user = await User.findOne({ username: username }).populate(
				"studDetails"
			);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const receipts = await Receipt.find({
				userid: user._id,
				semester: semester,
			});

			if (receipts.length === 0) {
				console.log("No Receipt found!");
				res.render("student/fee_receipt", {
					username: username,
					receipts: receipts,
					msg: "No Receipt found!",
				});
			}

			// Generate PDF and send as a download
			const pdfDoc = new PDFDocument();

			pdfDoc.pipe(res);

			// Set font styles
			pdfDoc.font("Helvetica-Bold");
			pdfDoc.fontSize(25);

			// Header
			pdfDoc.text("Fees Receipt", { align: "center" });
			pdfDoc.moveDown();

			// Student details
			pdfDoc.fontSize(17);
			pdfDoc.text(`Student Name:     ${user.studDetails.student_name}`);
			pdfDoc.text(`Student ID:            ${user.studDetails.student_id}`);
			pdfDoc.text(`Semester:              ${receipts[0].semester}`);
			pdfDoc.text(`Fee Payment:        ${receipts[0].feePayment}`);
			pdfDoc.text(
				`Date:                       ${receipts[0].date.toDateString()}`
			);
			pdfDoc.moveDown();

			// Separator
			pdfDoc
				.lineCap("butt")
				.moveTo(50, pdfDoc.y)
				.lineTo(550, pdfDoc.y)
				.stroke();
			pdfDoc.moveDown();

			// Your Institution Logo and HostelEase Project Image
			pdfDoc.image("./public/images/hostelEase.png", 250, pdfDoc.y, {
				width: 100,
			});
			pdfDoc.moveDown();

			// Additional Designs
			pdfDoc.font("Helvetica");
			pdfDoc.text("Your home away from home", {
				align: "center",
			});
			pdfDoc.moveDown();

			// Separator
			pdfDoc
				.lineCap("butt")
				.moveTo(50, pdfDoc.y)
				.lineTo(550, pdfDoc.y)
				.stroke();
			pdfDoc.moveDown();

			// Thank you message and contact information
			pdfDoc.fontSize(16);
			pdfDoc.text("Thank you for your payment!", { align: "center" });
			pdfDoc.fontSize(12);
			pdfDoc.text("Contact Information: ", { align: "center" });

			pdfDoc.end();

			res.setHeader("Content-Type", "application/pdf");
			res.setHeader(
				"Content-Disposition",
				`attachment; filename=receipts_${user.username}_${semester}.pdf`
			);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});
};
