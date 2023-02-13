const connectDB = require("./db")
const express = require("express")
const config = require("./config/index")
const cors = require("cors")
const router = require("./routers/userRouters")
const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use("/api", router)


app.listen(config.PORT,()=>{
    console.log(`server is running at port ${config.PORT}`)
})