const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "name is required"],
        maxLength: [30, "Name should be less then 30 char"],
        trim: true,
    },
    email:{
        type:String,
        required: [true, "email is required"],
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    blogs:[{type: mongoose.Types.ObjectId,ref: "Blog",required: true}]
},

{
    timestamps: true
})

module.exports = mongoose.model("User",userSchema)