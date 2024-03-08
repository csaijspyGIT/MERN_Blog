import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
            Welcome! Yeah, you can also sign in via google or using your own
            email.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5 ">
            <div className="">
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your Email" />
              <TextInput
                type="text"
                placeholder="example@gmail.com"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput type="text" placeholder="Pasword#$23" id="password" />
            </div>
            <Button
              className=" text-white bg-gradient-to-r from-slate-500 via-indigo-500 to-purple-500  w-full font-semibold"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex flex-row gap-2 mt-3">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500 font-semibold">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
