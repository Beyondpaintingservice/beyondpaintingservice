/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { motion } from "framer-motion";

const ServicesCard = ({
  imageUrl = "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  title = "Rakib RsM",
  description = "Developer",
  contactURL = "",
}) => {
  return (
    <>
      <BackgroundGradient>
        <div className="max-w-[30rem] min-h-[30rem] max-h-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8 md:p-2 flex flex-col justify-between ">
          <motion.div
            className="flex flex-col items-center justify-center p-2"
            initial={{ marginTop: "100%" }}
            animate={{ marginTop: "0px", animationDuration: "0.5s" }}
          >
            <img
              className="max-h-[230px] mb-3 rounded-md shadow-lg"
              src={imageUrl}
              alt={title + "'Photo"}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">
              {title}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {`${description.slice(0, 250)}...More..`}
            </span>
          </motion.div>
          <div className="w-full flex justify-center items-center">
            <Link
              to={"/contact"}
              className="text-white bg-blue-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-3 lg:px-5 py-2 lg:py-2.5   dark:bg-pink-600 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-800 cursor-pointer my-3"
            >
              Know more
            </Link>
          </div>
        </div>
      </BackgroundGradient>
    </>
  );
};

export default ServicesCard;
