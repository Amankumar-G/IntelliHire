import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {singleCv , multipleCv } from "../Controller/fileUpload.js";

// Helper to get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//Take a JD title name for refrencing
router.post("/one", upload.single("CV"), singleCv);
  

router.post("/many", upload.array("CVs"), multipleCv);

export default router;
































