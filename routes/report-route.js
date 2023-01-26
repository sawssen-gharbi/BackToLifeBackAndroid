import express from "express";
import {body} from 'express-validator';
import {addReport, getReport , deleteReport,editReport} from "../controllers/report-controller.js";
const router = express.Router();


router.route("/addReport").post(addReport);
router.route("/getReport/:id").get(getReport);
router.route("/deleteReport/:id").post(deleteReport);
router.route("/editReport/:id").put(editReport);

export default router;