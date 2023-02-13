import axios from "axios";
import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate()
  const [blogid,setBlogId] = useState()
  const [userinput, setUserInput] = useState({
    title: "",
    description: "",
  });

  const id = useParams().id;
  console.log(id);

  const handleInput = (e) => {
    const inputData = { ...userinput };
    inputData[e.target.name] = e.target.value;
    setUserInput(inputData);
  };

  

  useEffect(() => {
    const handleApi = async () => {
      const res = await axios.get(`/api/blog/${id}`)
        .catch((err) => {
          console.log(err)
        })
      const apidata = await res.data
      return apidata
    };

      handleApi().then((data)=>setBlogId(data.blog))
  }, [id])  
  

  const updateBlogApi = async()=>{
    const res = await axios.put(`/api/update/${id}`,{
      title:userinput.title,
      description: userinput.description
    })
    .catch((err)=>{
      console.log(err)
    })
    const data = await res.data
    return data
   }

  const onSubmitBlog = (e) => {
    e.preventDefault()
    console.log(blogid)
    updateBlogApi().then((data)=>console.log(data))
    .then(() => navigate("/myBlogs"))
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <form className="w-1/2 mt-10" onSubmit={onSubmitBlog}>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Add Title..."
              value={userinput.title}
              onChange={handleInput}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
              value={userinput.description}
              onChange={handleInput}
            ></textarea>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
