const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {                // User email (required during LOGIN)
        type: String,
        required: true,
        match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, "invalid email"],
        trim: true
    },
    UID: {                  // Unique ID of the user's device
        type: String,
        required: true
    },
    blocked: {              // Is the user blocked from attending meeting
        type: Boolean,
        default: 0
    },
    registered: {           // Can the user host a meeting
        type: Boolean,
        default: 1
    },
    addedOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);