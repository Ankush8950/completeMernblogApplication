const User = require("../models/user.schema")
const bcrypt = require("bcrypt")
const asyncHandler = require("../utils/asyncHandler")
const customError = require("../utils/customError")


// get all user in database.
exports.getAllUser = asyncHandler(async(req,res)=>{
    let user = await User.find();

    if(!user){
        throw new customError("No user found", 404)
    }

    res.status(200).json({
        success: true,
        user
    })
})

// signup controllers
exports.signUp = asyncHandler(async(req,res)=>{
    const {name,email, password} = req.body

    if(!(name || email || password)){
        throw new customError("all details required", 400)
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new customError("user exist in databse",400)
    }

    const EncryptPassword = await bcrypt.hash(password,10)


    const user =await User.create({
        name,
        email,
        password: EncryptPassword,
        blogs:[]
    })

    res.status(200).json({
        success: true,
        message:"user created succesfull",
        user 
    })
})


exports.signIn = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if(!(email || password)){
        throw new customError("all details required",400)
    }

    const user = await User.findOne({email})

    if(!user){
        throw new customError("invalid credentials",400)
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    if(!isPasswordCorrect) {
        throw new customError("Invalid password",400)
    }

    res.status(200).json({
        success: true,
        message: "login successful",
        user: user
    })
})