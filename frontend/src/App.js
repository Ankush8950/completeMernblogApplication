import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Auth";
import Blogs from "./components/Blogs"
import UserBlogs from "./components/UserBlog"
import BlogDetails from "./components/BlogDetails"
import AddBlog from "./components/AddBlog"
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  return (
    <React.Fragment>
    <div className="fixed w-full z-10">
      <Header />
      </div>

      <div className="pt-[6rem]  ">
      <Routes>
      {
        !isLoggedIn ? 
        <Route path="/auth" element={<Login />} /> : <>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/addblog" element={<AddBlog />} />
        <Route path="/myBlogs" element={<UserBlogs/>} />
        <Route path="/myBlogs/:id" element={<BlogDetails />} /> 
        </>}
      </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
