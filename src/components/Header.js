import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO } from "../utils/Constants";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 p-2  z-10 flex justify-between">
      <img className="  w-44 " alt="header" src={LOGO} />
      {user && (
        <div className="flex">
          <img className="w-12 h-12" alt="usericon" src={USER_AVATAR} />
          <p
            onClick={handleSignout}
            className="p-1 m-5 rounded bg-red-500 text white"
          >
            sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
