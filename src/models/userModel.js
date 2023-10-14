const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'user name is required!'],
        trim: true,
        maxlength: [31, 'user name can be maximum 30 characters!'],
        minlength: [3, 'user name can be maximum 3 characters!'],
    },
    email: {
        type: String,
        required: [true, "user email is required!"],
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
    password: {
        type: String,
        required: [true, 'user password is required!'],
        trim: true,
        minlength: [6, 'user pass must be minimum 6 characters!'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
        default: "https://i.ibb.co/3Mrx6Fg/blank-profile.webp" || 'public/imaged/users/blank-profile.webp'
    },
    role: {
        type: String,
        default: "user",
    },
    projects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Project' // 'Project' should be the model name of the referenced projects
        }],
        default: []
    },
    tasks: {
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    },
}, {timestamps: true})

const User = model("Users", userSchema);

module.exports = User;