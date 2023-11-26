module.exports = (app, authenticateUser) => {
	app.get(
		"/student/:uName/receipts/:semester",
		authenticateUser,
		async (req, res) => {
			const username = req.params.uName;
			try {
				const { semester } = req.params;
				const userId = req.user._id;

				const user = await User.findById(userId);
				if (!user) {
					return res.status(404).json({ error: "User not found" });
				}

				const receipts = await Receipt.find({
					userid: userId,
					semester: semester,
				});

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

				// Optionally, you can delete the generated PDF file after sending it to the client
				// fs.unlinkSync(pdfPath);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	);
};
