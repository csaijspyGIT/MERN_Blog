import { TextInput, Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  
    
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-3xl my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 self-center shadow-md rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="ProfilePicture"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
          <TextInput type="email" id="email" defaultValue={currentUser.email} />
          <TextInput type="password" id="password" className="" />
          <Button
            type="submit"
            className="bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500"
            outline
          >
            Update
          </Button>
        </div>
        <div className="flex justify-between items-center text-red-600 font-semibold cursor-pointer">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
