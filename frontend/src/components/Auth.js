import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [error , setError] = useState(false) 
  const [isSignup, setIsSignup] = useState(false);
  const [userinput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  // console.log(isSignup);

  // console.log(userinput)
  const changeHandler = (e) => {
    const data = { ...userinput };
    data[e.target.name] = e.target.value;
    setUserInput(data);
  };

  const handleApi = async (type = "login") => {
    const res = await axios
      .post(`/api/${type}`, {
        name: userinput.name,
        email: userinput.email,
        password: userinput.password,
      })
      .catch((err) => {
        console.log(err);
      });
      const  dataapi = await res.data
      return dataapi
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      handleApi("signup")
      .then((userdata)=>localStorage.setItem("userId",userdata.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => {
          navigate("/blogs");
        });
    setUserInput('')
    } else
      handleApi()
        .then((userdata)=>localStorage.setItem("userId",userdata.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => {
          navigate("/blogs");
        });
    // handleApi()
    console.log(userinput);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="font-semibold text-xl mb-5">
        {isSignup ? "Sign up" : "Log in"}
      </h1>
       {/* <p className="text-red-500 text-xs italic">
              {error}
            </p> */}
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {isSignup && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="name"
                placeholder="Name"
                value={userinput.name}
                onChange={changeHandler}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="email"
              type="text"
              placeholder="email..."
              value={userinput.email}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              value={userinput.password}
              onChange={changeHandler}
            />
           
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>

          <h1 className="cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
            Don't have a account?{" "}
            <span className="text-[#94A1C0]">
              {isSignup ? "Login" : "Sign up"}
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Auth;
