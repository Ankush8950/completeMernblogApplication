const express = require("express")
const {
    getAllUser,
    signUp,
    signIn
} = require("../controllers/userController")
const {
    getAllBlog,
    addBlog,
    updateBlog,
    blogById,
    deleteBlog,
    getUserById
} = require("../controllers/blogController")
const router = express.Router()

router.get("/", getAllUser)
router.post("/signup",signUp)
router.post("/login",signIn)


// blog router
router.get("/blog", getAllBlog)
router.post("/addblog",addBlog)
router.put("/update/:id",updateBlog)
router.get("/blog/:id", blogById)
router.delete("/blog/:id", deleteBlog)
router.get("/user/:id",getUserById)
module.exports = router