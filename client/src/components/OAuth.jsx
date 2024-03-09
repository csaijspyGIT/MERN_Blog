import { Button } from "flowbite-react";
import React from "react";
import { BsGoogle } from "react-icons/bs";

const OAuth = () => {
  return (
    <Button
      type="button"
      className=" bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white font-semibold"
      outline
    >
      <BsGoogle className="text-lg mr-3" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default OAuth;
