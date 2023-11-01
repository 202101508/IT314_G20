import express from "express";
import { records } from "./dataBase.js";
import { inbox } from "./dataBase.js";

const router = express.Router();

// app.use(express.static("public"));

router.get("/inbox", (req, res) => {
    res.render("vp_admin_inbox.ejs", {inbox});
});

router.get("/records", (req, res) => {
    res.render("vp_admin_records.ejs", {records});
});

module.exports=router;