const { default: mongoose } = require("mongoose")
const Blog = require("../models/blog.schema")
const User = require("../models/user.schema")
const asyncHandler = require("../utils/asyncHandler")
const customError = require("../utils/customError")

exports.getAllBlog = asyncHandler(async(req,res)=>{
    let blogs = await Blog.find().populate("user")

    if(!blogs){
        throw new customError("blog not found",400)
    }

    res.status(200).json({
        success: true,
        blogs
    })
})

exports.addBlog = asyncHandler(async(req,res)=>{
    const {title, description, image, user} = req.body

    const existingUser = await User.findById(user)

    if(!existingUser){
        throw new customError("unable to find user by this id")
    }

    const blog = await Blog.create({
        title,
        description,
        image,
        user
    })

    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({session})
    existingUser.blogs.push(blog)
    await existingUser.save({session})
    await session.commitTransaction()

    res.status(200).json({
        success:true,
        blog
    })
})

exports.updateBlog = asyncHandler(async (req, res) => {
    const {title,description} = req.body
    const blogId = req.params.id

    const blog = await Blog.findByIdAndUpdate(blogId,{
        title,
        description
    })

    if(!blog){
        throw new customError("unable to update the blog",500)
    }

    res.status(200).json({
        success: true,
        blog
    })
    console.log(blog)
})


exports.blogById = asyncHandler(async(req,res)=>{
    const id = req.params.id;

    const blog = await Blog.findById(id)
    if(!blog){
        throw new customError("no blog found",404)
    }

    res.status(200).json({
        success: true,
        blog
    })

})


exports.deleteBlog = asyncHandler(async(req,res)=>{
    let id = req.params.id
    const blog = await Blog.findByIdAndRemove(id).populate("user")
    await blog.user.blogs.pull(blog)
    await blog.user.save()

    if(!blog){
        throw new customError("unable to delete blog",500)
    }

    res.status(200).json({
        success: true,
        message: "blog delete successfull",
    })
})

exports.getUserById = asyncHandler(async(req,res)=>{
    const userId = req.params.id
    let userBlogs = await User.findById(userId).populate("blogs")

    if(!userBlogs){
        throw new customError("no blog founds",400)
    }

    res.status(200).json({
        user: userBlogs
    })
})