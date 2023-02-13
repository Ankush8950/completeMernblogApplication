const mongoose = require("mongoose")
const config = require("./config/index")

const connectDB = () =>{
    mongoose.set('strictQuery', false)
    mongoose.connect(config.MONGODB_URL,{
         useNewUrlParser: true,
         useUnifiedTopology: true
    }).then((conn)=>{
        console.log(`db connected successfull ${conn.connection.host}`)
    }).catch((err)=>{
        console.log(err)
        process.exit(1)
    })
}

module.exports = connectDB