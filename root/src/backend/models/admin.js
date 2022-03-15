const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    email: {                // User email (required during LOGIN)
        type: String,
        required: true,
        match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, "invalid email"],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Admin', AdminSchema);