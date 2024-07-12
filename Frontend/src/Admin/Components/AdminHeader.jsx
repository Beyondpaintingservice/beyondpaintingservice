import { useEffect, useState } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { headerItemCSS } from "../../constant/headerItem";
import { toast } from "react-toastify";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setScreenWidth] = useState(window.screen.width);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const admin = useSelector((store) => store.user.userDetails?.accessToken);

  useEffect(() => {
    const isLoggedIn = () => {
      if (!admin) {
        navigate("/");
      }
    };

    isLoggedIn();
  }, [admin, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      return newScreenWidth;
    };

    const newScreenWidth = handleResize();

    if (newScreenWidth > 350) {
      setMobileOpen(true);
    } else {
      setMobileOpen(false);
    }

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHamburgerClick = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    try {
      dispatch(setUser(null));
      toast.success("Successfully logged out!");
      //   navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img src='' className='h-8' alt='Logo' /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Painter Dashboard
              </span>
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={handleHamburgerClick}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center ${
                  mobileOpen ? "" : "hidden"
                }`}
              >
                <SlMenu size={28} />
              </span>
              <span
                className={`w-6 h-6 flex items-center justify-center ${
                  mobileOpen ? "hidden" : ""
                }`}
              >
                <VscChromeClose size={28} />
              </span>
            </button>
            <div
              className={`${
                mobileOpen ? "hidden" : ""
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul
                className="absolute w-full left-0 mx-auto md:relative font-medium flex flex-col justify-center items-center md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white   md:dark:bg-gray-900 dark:border-gray-700"
                onClick={handleHamburgerClick}
              >
                <li>
                  <a
                    href="/"
                    target="_blank"
                    className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Visit Site
                  </a>
                </li>
                <li>
                  <NavLink
                    to={"/admin/dashboard"}
                    className={headerItemCSS}
                    aria-current="page"
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                    to={"/admin/about"}
                    className={headerItemCSS}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                    to={"/admin/services"}
                    className={headerItemCSS}
                  >
                    Services
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                    to={"/admin/gallery"}
                    className={headerItemCSS}
                  >
                    Gallery
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                    to={"/admin/team"}
                    className={headerItemCSS}
                  >
                    Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "blue" : "rgb(219 39 119)",
                    })}
                    to={"/admin/contact"}
                    className={headerItemCSS}
                  >
                    Contact
                  </NavLink>
                </li>
                <li onClick={logout}>
                  <button className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800 ml-3 cursor-pointer my-3 md:my-0">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default AdminHeader;
