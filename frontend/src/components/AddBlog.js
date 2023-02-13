import axios from "axios";
import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
   const navigate  =useNavigate()
  const [userinput, setUserInput] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleInput = (e) =>{
    const inputData = {...userinput}
    inputData[e.target.name] = e.target.value
    setUserInput(inputData)
  }

  const addBlogApi = async () =>{
    const res = await axios.post(`/api/addblog`,{
      title:userinput.title,
      description:userinput.description,
      image: userinput.imageURL,
      user: localStorage.getItem("userId")
    })
    .then((data)=>{
      console.log(data)
    })
    .then(() => navigate("/myBlogs"))
    .catch((err)=>{
      console.log(err)
    })
    console.log(res)

    // const dataApi = await res.data
    // return dataApi
  }

  const onSubmitBlog = (e) =>{
    e.preventDefault()
    console.log(userinput)
    addBlogApi()
  }


  return (
    <div className="flex items-center justify-center" id="addblog">
      <form className="w-3/4 sm:w-1/2 mt-10" onSubmit={onSubmitBlog}>
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

        <div className="mb-2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="cursor-pointer shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            // type="file"
            // accept = "image/png, image/gif, image/jpeg"
            name = "imageURL"
            value={userinput.imageURL}
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
  );
};

export default AddBlog;
