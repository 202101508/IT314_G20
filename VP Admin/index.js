import express from "express";
import { records } from "./dataBase.js";
import { inbox } from "./dataBase.js";

// console.log(records);
// console.log(inbox);

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/inbox", (req, res) => {
    res.render("vp_admin_inbox.ejs", {inbox});
});

app.get("/records", (req, res) => {
    res.render("vp_admin_records.ejs", {records});
});

app.listen(port, (err) => {
    if(err) throw err;

    console.log("Server connected to port no : ", port);
});