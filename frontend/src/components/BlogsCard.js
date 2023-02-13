import React, { useState } from "react";
import deleteimg from "../image/delete.svg";
import editimg from "../image/edit.svg";
import { useNavigate } from "react-router-dom";
import BlogCardshow from "./BlogCardshow";
import axios from "axios";

const BlogsCard = ({
  title,
  description,
  imageUrl,
  userName,
  date,
  isUser,
  id,
}) => {
  const navigate = useNavigate();
  const [cardShow, setCardShow] = useState(false);
  // const getFirst =

  const randomColor = () => {
    var randColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randColor;
  };
  // console.log(userName)
  // console.log(title, isUser)

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteApi = async () => {
    const res = await axios.delete(`/api/blog/${id}`).catch((err) => {
      console.log(err);
    });
    const data = await res.data;
    return data;
  };
  const deleteBlog = () => {
    deleteApi().then((data) => console.log(data));
  };

  return (
    <div className="w-[18rem] lg:w-1/2 m-2 ">
      {cardShow ? (
        <BlogCardshow 
          title={title}
          description={description}
          imageUrl={imageUrl}
          userName={userName}
          date={date}
          setcardSHow={setCardShow}
        />
      ) : (
        <div
          className="border-2 mt-5 rounded ">
          <div className="w-full lg:flex cursor-pointer">
            <div className=" lg:h-auto lg:w-48 flex-none  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <img onClick={() => setCardShow(true)}
                className="h-full flex items-center justify-center"
                src={imageUrl}
                alt=""
              />
            </div>
            <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-medium sm:font-bold text-xl mb-2">
                    {title.toUpperCase()}
                  </div>
                  {isUser && (
                    <div className="flex space-x-5">
                      <img
                        className="w-5 cursor-pointer"
                        src={editimg}
                        alt=""
                        onClick={handleEdit}
                      />
                      <img
                        className="w-5 cursor-pointer "
                        src={deleteimg}
                        alt=""
                        onClick={deleteBlog}
                      />
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm sm:text-base h-[6rem] overflow-hidden">
                  {description.charAt(0).toUpperCase() + description.slice(1)}
                </p>
              </div>
              <div className="flex items-center">
                <p
                  className="w-10 h-10 rounded-full mr-4 text-black border-2 flex items-center justify-center"
                  onChange={randomColor}
                >
                  {userName.name.slice(0, 1)}
                </p>
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">{userName.name}</p>
                  <p className="text-gray-600">{date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsCard;
