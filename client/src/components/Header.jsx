import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/theme.slice.js";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector(state => state.theme);
  return (  
    <Navbar className="border-b-2">
      <Link className="self-center font-semibold">
        <span className="px-2 py-2 bg-gradient-to-r from-slate-600 via-indigo-500 to-purple-600 rounded-lg font-semibold text-white">
          Rijan's
        </span>
        Blog
      </Link>
      <TextInput
        type="text"
        placeholder="Search"
        rightIcon={AiOutlineSearch}
        className="hidden sm:inline"
      />
      <Button className="w-12 h-10 lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" onClick={()=>dispatch(toggleTheme())} pill>
          {
            theme === "dark" ? (
              <FaSun />
            ): (
              <FaMoon />
            )
           }
        </Button>
        <Link to="/signin">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="text-sm block">@{currentUser.username}</span>
                <span className="text-sm block truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to = {"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item> Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
          )}
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/About">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
