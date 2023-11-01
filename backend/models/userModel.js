const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name:{ type:String, required:true },
    username:{ type:String, required:true },
    password:{ type:String, required:true },
    picture:{ type:String, required:true, default:"https://icon-library.com/icon/default-profile-icon-24.html" },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;