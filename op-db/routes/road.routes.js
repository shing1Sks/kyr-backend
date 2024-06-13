import { Router } from "express";
import { getRoads, uploadRoad } from "../controllers/road.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/get-roads").get(getRoads);
router.route("/upload-road").post(upload.array("images"), uploadRoad);

export default router;
