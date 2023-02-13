import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
import LogOut from "../image/Logout.svg";
import hamgerger from "../image/Hamberger.svg"
import close from "../image/close.svg"
import home from "../image/blog123.jpg"

// import { Link } from "react-scroll";

const Header = () => {
  const dispatch = useDispatch();
  const [profileToggle, setProfileToggle] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [hamgergers, setHamberger] = useState(false)
  const [userblogs, setUserBlogs] = useState();
  const id = localStorage.getItem("userId");
  // console.log(id)
  const getUserBlog = async () => {
    const res = await axios.get(`/api/user/${id}`).catch((err) => {
      console.log(err);
    });
    const apidata = await res.data;
    return apidata;
  };

  useEffect(() => {
    getUserBlog().then((data) => setUserBlogs(data.user));
  }, []);
// console.log(userblogs)


const closeMenu = () => setHamberger(false)
  return (
    <div className="">
      <nav className="bg-white dark:bg-gray-800  shadow py-2 sm:py-4 ">
        <div className="px-5 md:px-20 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link className="flex-shrink-0" to="/blogs">
                <h1 className="font-bold text-xl">Blog App</h1>
              </Link>
              {isLoggedIn && (
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <Link
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      to="/blogs"
                    >
                      All blog
                    </Link>
                    
                    <Link
                      className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      to="/myBlogs"
                    >
                      Myblog
                    </Link>

                    <Link
                      className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      to="/blogs/addblog"
                    >
                      AddBlog
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  {!isLoggedIn && (
                    <div>
                      <Link to="/auth">
                        <button className="ml-3 border-2 rounded-lg pl-2 pr-2 pb-1 sm:w-20 sm:h-10 capitalize font-normal text-ms sm:text-base">
                          sign in
                        </button>
                      </Link>
                      <Link to="/auth">
                        <button className="ml-3 border-2 rounded-lg pl-2 pr-2 pb-1 sm:w-20 sm:h-10 capitalize font-normal text-ms sm:text-base">
                          sign up
                        </button>
                      </Link>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div className="relative inline-block text-left">
                      <div className="flex items-center">
                        <h1 className="mr-2">{userblogs.name}</h1>
                        <div className="flex border-2 rounded-lg md:rounded-full w-20 md:w-auto">
                        <button
                          type="button"
                          className=" flex items-center justify-center w-full rounded-md font-medium text-gray-700 "
                          id="options-menu"
                          onClick={() => setProfileToggle(!profileToggle)}
                        >
                          <p className="md:w-10 md:h-10  rounded-full pr-3 md:pr-0 border-r-2 md:border-0 text-black flex items-center justify-center">
                            {userblogs.name.slice(0, 1)}
                          </p>
                        </button>

                        {
                        hamgergers ?   <img className="w-[2rem] md:hidden" src={close} alt="" onClick={()=>setHamberger(!hamgergers)} />
                        :  <img className="w-[2rem] md:hidden" src={hamgerger} alt="" onClick={()=>setHamberger(!hamgergers)} />
                        }
                      </div>
                        {
                          hamgergers ? <div className="border-2 rounded-lg bg-[#242B2E] w-[15rem] h-[15rem] flex items-center justify-center text-white absolute top-[3rem] right-0  flex items-center"> <div className="flex items-center justify-center flex-col  items-baseline ">
                    <Link
                      className="px-3 py-2 rounded-md text-md font-medium"
                      to="/blogs"
                    >
                     <button className=" w-[10rem] pt-1 pb-1 rounded bg-white text-black"> All blog</button>
                    </Link>
                    <Link
                      className="  px-3 py-2 rounded-md text-md font-medium"
                      to="/myBlogs"
                    >
                      
                       <button className="w-[10rem] pt-1 pb-1 rounded bg-white text-black">Myblog</button>
                    </Link>

                    <Link
                      className=" px-3 py-2 rounded-md text-md font-medium"
                      to="/blogs/addblog"
                    >
                       <button className="w-[10rem] pt-1 pb-1 rounded bg-white text-black">AddBlog</button>
                    </Link>
                  </div></div> : ''
                        }
                      </div>
                      {profileToggle ? (
                        <div className="absolute right-0 w-72 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1 "
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <Link
                              to="/user/profile"
                              className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                            
                              <span className="flex items-center justify-center">
                                <span className="flex flex-col ">
                                <h1 className="font-medium text-sm">Name : {userblogs.name}</h1>
                                <h1 className="font-medium text-sm"> Email : {userblogs.email}</h1></span>
                              </span>
                            </Link>

                            <Link
                              to="/auth"
                              className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex items-center justify-center ">
                                <img
                                  className="w-5 h-5 text-[#E21717]"
                                  src={LogOut}
                                  alt=""
                                />
                                <button
                                  className="text-[#E21717] ml-4"
                                  onClick={() => dispatch(authActions.logout())}
                                >
                                  Logout
                                </button>
                              </span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      
    </div>
  );
};

export default Header;
