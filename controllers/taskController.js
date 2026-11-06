
const db = require("../database/db");

// 1. CREATE TASK
const createTask = (req, res) => {
    try {
        const { title, description = "", status = "pending" } =
            req.body || {};

        if (
            typeof title !== "string" ||
            !title.trim() ||
            title.trim().length > 200
        ) {
            return res.status(400).json({
                message: "Valid task title is required (max 200 characters)"
            });
        }

        if (
            typeof description !== "string" ||
            description.length > 1000
        ) {
            return res.status(400).json({
                message: "Description must be a string (max 1000 characters)"
            });
        }

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Status must be pending or completed"
            });
        }

        const result = db.prepare(`
            INSERT INTO tasks (title, description, status, user_id)
            VALUES (?, ?, ?, ?)
        `).run(
            title.trim(),
            description.trim(),
            status,
            req.user.id
        );

        const task = db.prepare(
            "SELECT * FROM tasks WHERE id = ?"
        ).get(result.lastInsertRowid);

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// 2. GET ALL TASKS
const getTasks = (req, res) => {
    try {
        const tasks = db.prepare(`
            SELECT * FROM tasks
            WHERE user_id = ?
            ORDER BY created_at DESC
        `).all(req.user.id);

        return res.status(200).json({
            count: tasks.length,
            tasks
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// 3. GET TASK BY ID
const getTaskById = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = db.prepare(`
            SELECT * FROM tasks
            WHERE id = ? AND user_id = ?
        `).get(id, req.user.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({ task });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// 4. UPDATE TASK
const updateTask = (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description, status } = req.body || {};

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        if (
            typeof title !== "string" ||
            !title.trim() ||
            title.trim().length > 200
        ) {
            return res.status(400).json({
                message: "Valid task title is required"
            });
        }

        if (
            typeof description !== "string" ||
            description.length > 1000
        ) {
            return res.status(400).json({
                message: "Valid description is required"
            });
        }

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Status must be pending or completed"
            });
        }

        const result = db.prepare(`
            UPDATE tasks
            SET title = ?,
                description = ?,
                status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND user_id = ?
        `).run(
            title.trim(),
            description.trim(),
            status,
            id,
            req.user.id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const updatedTask = db.prepare(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?"
        ).get(id, req.user.id);

        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// 5. DELETE TASK
const deleteTask = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const result = db.prepare(`
            DELETE FROM tasks
            WHERE id = ? AND user_id = ?
        `).run(id, req.user.id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
