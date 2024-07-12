/* eslint-disable react/prop-types */

import { BackgroundGradient } from "./BackgroundGradient";
import { Link } from "react-router-dom";

const MemberCard = ({
  imageUrl = "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  name = "Rakib RsM",
  designation = "Developer",
  contactURL = "",
}) => {
  return (
    <>
      <BackgroundGradient>
        <div className="min-w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8 md:p-2 ">
          <div className="flex flex-col items-center justify-center px-20 py-7">
            <img
              className="w-32 h-32 mb-3 rounded-full shadow-lg"
              src={imageUrl}
              alt={name + "'Photo"}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {designation}
            </span>
            <div className="flex mt-4 md:mt-6">
              <Link
                to={"/contact"}
                className="text-white bg-blue-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5   dark:bg-pink-600 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-800 cursor-pointer"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </>
  );
};

export default MemberCard;
