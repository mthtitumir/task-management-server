const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    projectId: {
        type: String,
        required: [true, 'user id is required!'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'user name is required!'],
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
    assigneeList: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Assignee'
        }],
        default: []
    },
    status: {
        type: String,
        required: [true, "status is required!"],
        default: "ongoing"
    },
    // all task id 
    tasks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    },
}, { timestamps: true })

const Project = model("Projects", projectSchema);

module.exports = Project;