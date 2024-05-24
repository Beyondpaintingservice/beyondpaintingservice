import logo from "../assets/logo.png";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { LuMailPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
    <footer className="sm:px-4 md:my-4 md:px-0 w-full mx-auto divide-y dark:bg-gray-800 bg-white dark:text-gray-100 text-gray-800 absolute left-0">
      <div className="container p-4 md:p-10 flex flex-col justify-between  mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            to={"/"}
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-gray-500 bg-gray-600">
              <img src={logo} alt="Logo" />
            </div>
            <span className="self-center text-2xl font-semibold z-20">
              Beyond Painting Service
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4 z-20">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-50 text-gray-900 underline text-base">
              Address
            </h3>
            <div className="addressInfo text-justify">
              Senga, Barpeta, Assam, Pin- 7813... Phone:{" "}
              <a href="tel:+91 6003105660" className="font-semibold">
                +91 60031-05660
              </a>{" "}
              OR{" "}
              <a href="tel:+91 9101247335" className="font-semibold">
                +91 91012-47335
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-50 text-gray-900">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50 text-gray-900">
              Developers
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50 text-gray-900">
              Social media
            </div>
            <div className="flex justify-evenly space-x-3 py-3 text-pink-600 ">
              <a href="/" className="hover:text-white duration-200 ">
                <BsFacebook size={30} />
              </a>{" "}
              <a
                href={`https://wa.me/+916003105660`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white duration-200 "
              >
                <BsWhatsapp size={30} />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white duration-200 "
              >
                <BsInstagram size={30} />
              </a>
              <a
                href="mailto:"
                className="-mt-[2px] hover:text-white duration-200 "
              >
                <LuMailPlus size={35} />
              </a>
            </div>
          </div>
        </div>
        <span className="absolute left-0 top-0 z-[1] opacity-50">
          <svg
            width="219"
            height="192"
            viewBox="0 0 419 492"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="55.0003"
              cy="350"
              rx="364"
              ry="364"
              transform="rotate(-45 55.0003 350)"
              fill="url(#paint0_linear)"
            ></ellipse>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="55.0003"
                y1="-14"
                x2="55.0003"
                y2="714"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13C296" stopOpacity="0.4"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute bottom-0 right-0 z-[1]">
          <svg
            width="327"
            height="220"
            viewBox="0 0 327 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="199.343"
              cy="199.965"
              rx="199.017"
              ry="199.017"
              transform="rotate(-75 199.343 199.965)"
              fill="url(#paint0_linear)"
            ></ellipse>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="199.343"
                y1="0.948181"
                x2="199.343"
                y2="398.982"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.32"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-400 text-gray-600">
        &copy; {new Date().getFullYear()} Company Co. All rights reserved.{" "}
        <Link to="/admin-login">--</Link>
      </div>
    </footer>
  );
};

export default Footer;
