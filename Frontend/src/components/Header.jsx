import { useState, useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Outlet, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import ToggleDarkMode from "./ToggleDarkMode";
import { headerItemCSS } from "../constant/headerItem";
import { motion } from "framer-motion";

const Header = () => {
	// eslint-disable-next-line no-unused-vars
	const [show, setShow] = useState("top");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenu, setMobileMenu] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { userDetails } = useSelector((state) => state?.user);
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow("hide");
			} else {
				setShow("show");
			}
		} else {
			setShow("top");
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY]);

	const navigationHandler = (type) => {
		if (type === "home") {
			navigate("/");
		} else if (type === "about") {
			navigate("/about");
		} else if (type === "services") {
			navigate("/services");
		} else if (type === "gallery") {
			navigate("/gallery");
		} else if (type === "our-team") {
			navigate("/our-team");
		} else if (type === "contact") {
			navigate("/contact");
		} else if (type === "explore-plans") {
			navigate("/explore-plans");
		} else if (type === "admin-login") {
			navigate("/admin-login");
		}
		setMobileMenu(false);
	};

	const logout = () => {
		try {
			dispatch(setUser(null));
			toast.success("Successfully logged out!");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
    <>
      <header
        className={`border-gray-200 lg:px-6 py-4 px-2 md:px-0 mx-auto left-0 fixed z-50 min-w-full dark:md:bg-gray-950 md:z-50 bg-gray-100 dark:bg-gray-950 text-black shadow-lg`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl w-full">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => navigationHandler("home")}
          >
            <img src={logo} className="mr-3 h-6 sm:h-9 md:h-10" alt="Logo" />
          </span>
          <div className="flex items-center lg:order-2">
            <ToggleDarkMode />
            <span
              className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800 ml-3 cursor-pointer"
              onClick={() =>
                userDetails ? logout : navigationHandler("admin-login")
              }
            >
              {userDetails ? "Logout" : "Login"}
            </span>
            {/* <span
							className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
							onClick={() => navigationHandler("get-started")}
						>
							Get started
						</span> */}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setMobileMenu(!mobileMenu)} // Toggle mobileMenu state
            >
              <span
                className={`w-6 h-6 flex items-center justify-center ${
                  mobileMenu ? "hidden" : ""
                }`}
              >
                <SlMenu size={28} />
              </span>
              <span
                className={`w-6 h-6 flex items-center justify-center ${
                  mobileMenu ? "" : "hidden"
                }`}
              >
                <VscChromeClose size={28} />
              </span>
            </button>
          </div>
          <div className="md:flex hidden justify-between items-center w-full lg:w-auto lg:order-1">
            <ul className="flex mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full">
              <li>
                <NavLink
                  to={"/"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  aria-current="page"
                  //onClick={() => navigationHandler("home")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  //onClick={() => navigationHandler("about")}
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/services"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  // onClick={() => navigationHandler("services")}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/gallery"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  // onClick={() => navigationHandler("services")}
                >
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/our-team"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  // onClick={() => navigationHandler("our-team")}
                >
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "rgb(219 39 119)",
                  })}
                  className={headerItemCSS}
                  // onClick={() => navigationHandler("contact")}
                >
                  Contact us
                </NavLink>
              </li>
            </ul>
          </div>

          {mobileMenu && (
            <motion.div
              className="flex flex-col justify-between items-center w-full lg:hidden lg:w-auto lg:order-1 bg-gray-800 dark:bg-gray-750 dark:text-white text-black mt-2 "
              id="mobile-menu-2"
              animate={{ scale: 1.5, marginTop: "80px" }}
            >
              <ul className="dark:text-white flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full">
                <li>
                  <span
                    className="block py-2 pr-4 pl-3 rounded lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                    onClick={() => navigationHandler("home")}
                  >
                    Home
                  </span>
                </li>
                <li>
                  <span
                    className={headerItemCSS}
                    to={"/about"}
                    onClick={() => navigationHandler("about")}
                  >
                    About
                  </span>
                </li>

                <li>
                  <span
                    className={headerItemCSS}
                    to={"/services"}
                    onClick={() => navigationHandler("services")}
                  >
                    services
                  </span>
                </li>
                <li>
                  <span
                    className={headerItemCSS}
                    to={"/gallery"}
                    onClick={() => navigationHandler("gallery")}
                  >
                    Gallery
                  </span>
                </li>
                <li>
                  <span
                    className={headerItemCSS}
                    to={"/our-team"}
                    onClick={() => navigationHandler("our-team")}
                  >
                    Team
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => navigationHandler("contact")}
                    className={headerItemCSS}
                  >
                    Contact us
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
