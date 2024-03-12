import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../redux/dashboard/tab.slice.js";
import DashPost from "../components/DashPost.jsx";

const Dashboard = () => {
  const location = useLocation();
  const { tab } = useSelector(state => state.tab);
  const dispatch = useDispatch();


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    dispatch(changeTab(tabFromURL));
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col gap-10 md:flex-row">
      <div className="md:w-56">
        <DashSideBar />
     </div>
      {tab === "profile" && <DashProfile />}
      {tab==='posts' && <DashPost />}
    </div>
  );
};

export default Dashboard;
