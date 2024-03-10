import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/user.slice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const user = useSelector(state => state.user);
  const { loading, error: errorMessage } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.email) {
      dispatch(signInFailure("All mfields are required"));
    }
    
    try {
      dispatch(dispatch(signInStart()));
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
     
      if (data.success === false) {
        return dispatch(signInFailure(data.errMessage));
      }

      if (res.ok) {
        navigate('/');
      }
      dispatch(signInSuccess(data));
    } catch (err) {
      dispatch(signInFailure(err.messge))
    } 
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex max-w-3xl p-3 mx-auto flex-col md:flex-row gap-6 md:items-center">
        {/* Left */}
        <div className="flex-1">
          <Link className="font-bold text-4xl">
            <span className="px-2 py-2 bg-gradient-to-r from-slate-600 via-indigo-500 to-purple-600 rounded-lg font-semibold text-white mr-2">
              Rijan's
            </span>
            Blog
          </Link>
          <p className="font-semibold text-md mt-5">
            Sign in with your email and password
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Pasword#$23"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className=" text-white bg-gradient-to-r from-slate-500 via-indigo-500 to-purple-500  w-full font-semibold"
              type="submit"
              disabled = {loading}
            >
              {
                loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3"> Loading....</span>
                  </>
                ) : (
                    "Sign In"
                )
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex flex-row gap-2 mt-3">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color="failure">{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignIn;
