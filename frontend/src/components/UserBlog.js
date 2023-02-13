import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogsCard from './BlogsCard'

const UserBlog = () => {
   const [userblogs, setUserBlogs] = useState();
  const id = localStorage.getItem("userId")
  // console.log(id)
  const getUserBlog = async() =>{
      const res = await axios.get(`/api/user/${id}`)
      .catch((err)=>{
        console.log(err)
      })
      const apidata = await res.data
      return apidata
  }

  useEffect(()=>{
    getUserBlog().then((data) => setUserBlogs(data.user))
  },[userblogs])
  // console.log(userblogs)
  return (
    <div className='flex flex-col items-center justify-center mb-10' id='myblog'>
    {
      userblogs &&
      userblogs.blogs && userblogs.blogs.map((blog,index)=>{
        return <BlogsCard 
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={userblogs}
            date={blog.updatedAt}
        />
    })
    }
    </div>
  )
}

export default UserBlog