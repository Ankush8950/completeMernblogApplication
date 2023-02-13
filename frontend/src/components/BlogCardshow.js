import React, { useState } from "react";
import close from "../image/close.svg";

const BlogCardshow = ({
  title,
  description,
  imageUrl,
  userName,
  date,
  isUser,
  id,
  setcardSHow,
}) => {
  const [showmore, setShowMore] = useState(false);
  const data = description;
  return (
    <div className="h-full  absolute top-[7rem]">
      <div class="w-full sm:w-3/4 rounded overflow-hidden shadow-lg bg-white">
        <div className="relative cursor-pointer">
          <div className="w-full h-full absolute top-0 left-0">
            <img
              className="w-[2rem] md:w-10 absolute right-5 top-3 bg-white rounded z-10 text-slate-50"
              src={close}
              alt=""
              onClick={() => setcardSHow(false)}
            />
          </div>
          <img class="w-full" src={imageUrl} alt="" />
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{title.toUpperCase()}</div>
          <p class="text-gray-700 text-base relative">
            {showmore ? data : `${data.substring(0, 250)}`}
            <button
              onClick={() => setShowMore(!showmore)}
              className="text-normal text-sm  capitalize text-[#242B2E] underline	 absolute right-5 bottom-0"
            >
              {showmore ? "show less" : "show more"}
            </button>
          </p>
        </div>
        <div class="px-6 pt-4 pb-10">
          <div className="flex items-center">
            <p className="w-10 h-10 rounded-full  mr-4 text-black border-2 flex items-center justify-center">
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
  );
};

export default BlogCardshow;
