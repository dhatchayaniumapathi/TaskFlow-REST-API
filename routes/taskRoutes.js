
const express = require("express");
const router = express.Router();

// Import task controllers
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// Import authentication middleware
const authenticateToken = require("../middleware/authMiddleware");

// Protect all task routes
router.use(authenticateToken);

// CREATE task
router.post("/", createTask);

// READ all tasks
router.get("/", getTasks);

// READ one task
router.get("/:id", getTaskById);

// UPDATE task
router.put("/:id", updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;
