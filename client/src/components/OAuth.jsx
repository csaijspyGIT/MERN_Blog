import { Button } from "flowbite-react";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/user.slice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
  const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      try {
          const resultsFromGoogle =await signInWithPopup(auth, provider);
         
          const response = await fetch("/api/auth/google", {
              method: 'POST',
              headers: {
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({
                  name: resultsFromGoogle.user.displayName,
                  email: resultsFromGoogle.user.email,
                  googlePhotoURL: resultsFromGoogle.user.photoURL
              })
          })
          const data = await response.json();

          if (data.success === false) {
              dispatch(signInFailure(data.errMessage));
          }

          if (response.ok) {
              dispatch(signInSuccess(data));
              navigate("/");
          }

      } catch (err) {   
          console.log(err);
      }
  };

  return (
    <Button
      type="button"
      className=" bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white font-semibold"
      outline
      onClick={handleGoogleClick}
    >
      <BsGoogle className="text-lg mr-3" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default OAuth;
