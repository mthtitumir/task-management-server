const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    taskId: {
        type: String,
        required: [true, 'task id is required!'],
        unique: true,
    },
    projectId: {
        type: String,
        required: [true, 'project id is required!'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'task name is required!'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'task details is required!'],
        trim: true,
    },
    manager: {
        type: String,
        required: [true, "manager email is required!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please enter a valid email!'
        },
    },
    assignee: {
        type: String,
        required: [true, "assignee email is required!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please enter a valid email!'
        },
    },
    status: {
        type: String,
        required: [true, "status is required!"],
        default: "ongoing"
    },
    priority: {
        type: String,
        required: [true, "priority is required!"],
        default: "high",  // high low medium
    },
    deadline: {
        type: Date, // Date type for the deadline
        required: [true, "deadline is required!"]
    },
}, { timestamps: true })

const Task = model("Tasks", taskSchema);

module.exports = Task;