import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocument, HiDocumentAdd, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashSideBar = () => {
  const { tab } = useSelector((state) => state.tab);
  const {currentUser} = useSelector((state) => state.user);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin": "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                as="div"
                active={tab === "posts"}
                icon={HiDocumentAdd}
              >
                Posts
              </Sidebar.Item> 
          </Link>
          )
          }
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
