import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogsCard from './BlogsCard'

const Blog = () => {
  const [blogs,setBlogs] = useState();
 

  useEffect(()=>{
    const handleBlogApi = async() => {
      const res = await axios.get(`/api/blog`)
      .catch((err)=>{
        console.log(err)
      })
  
      const data =await res.data
      return data
    }
    handleBlogApi().then((data)=>setBlogs(data.blogs))
  }, [blogs])

  // console.log(blogs)
  return (
    <div className='flex lg:flex-col flex-wrap items-center justify-center mb-10' id='allblog'>
    {
      blogs && blogs.map((blog,index)=>{
        return <BlogsCard 
            key={index}
            id={blog._id}
            isUser = {localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user}
            date={blog.updatedAt}
        />
    })
    }
    </div>
  )
}

export default Blog