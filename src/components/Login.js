import React, { useRef, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { checkValidity } from "../utils/Validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/Constants";

const Login = () => {
  const [signIn, SetSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleButton = () => {
    const message = checkValidity(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (signIn) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleScreen = () => {
    SetSignIn(!signIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          alt="pic"
          className="w-full h-full object-cover"
          src={
            "https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          }
        />
      </div>
      <div className="bg-black absolute w-[100%]  h-[850px] object-cover  bg-opacity-60"></div>
      <form
        onClick={(e) => e.preventDefault()}
        className=" absolute p-12 text-white bg-black bg-opacity-80 w-3/12 my-36 mx-auto left-0 right-0"
      >
        <h2 className="font-bold py-4 px-2 text-3xl">
          {!signIn ? " Sign up" : "Sign in "}
        </h2>
        {!signIn ? (
          <input
            ref={name}
            type="text"
            placeholder="text"
            className="p-2 m-2 rounded  w-full bg-gray-700"
          />
        ) : (
          ""
        )}
        <input
          ref={email}
          type="email"
          placeholder="email address"
          className="p-2 m-2 rounded  w-full bg-gray-700"
        />
        <input
          ref={password}
          type="Password"
          placeholder="password"
          className="p-2 m-2 rounded  w-full bg-gray-700"
        />
        <p className="text-red-400 p-2">{errorMessage}</p>
        <h2
          onClick={handleButton}
          className="p-2 m-2 bg-red-600 text-white rounded w-full cursor-pointer text-center "
        >
          {!signIn ? " Sign up" : "Sign in "}
        </h2>

        <h2 className="py-2">
          <span className="text-gray-300 px-3 ">
            {!signIn ? "already registered?" : "new to netflix?"}
          </span>
          <span onClick={toggleScreen} className="cursor-pointer">
            <Link to="/"> {!signIn ? "Sign in" : "Sign up"}</Link>
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Login;
