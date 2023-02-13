const mongoose = require("mongoose")

const blogchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type:String,
    
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Blog",blogchema)