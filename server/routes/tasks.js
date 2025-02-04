import express from "express";
import taskControllers from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();
router.use(requireAuth);

router.get("/", taskControllers.getTasks);

router.get("/:id", taskControllers.getTask);

router.delete("/:id", taskControllers.deleteTask);

router.patch("/:id", taskControllers.patchTask);

router.post("/", taskControllers.createTask);


export default router;
