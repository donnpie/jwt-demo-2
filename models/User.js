//jwt-demo-2 /models.User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    routeAccess: [
        {
            type: String,
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);