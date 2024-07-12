import { useState, useEffect } from "react";
import { CgArrowRight } from "react-icons/cg";
import axios from "axios";
import { BackgroundGradient } from "./BackgroundGradient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getServicesApi } from "../constant/apiUrls";

const HeroRow = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(getServicesApi);
      // console.log(response);
      setServices(response?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <hr className="bg-pink-600 border-0 h-[1.1px]" />
      {services.map((service, index) => (
        <motion.section
          key={index}
          className="bg-white dark:bg-gray-950 pt-8 w-full "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, delay: 1 }}
          exit={{ opacity: 0 }}
        >
          <h4 className="text-black dark:text-white text-xl md:text-3xl md:mb-10 font-bold mb-3">
            Suitable For
          </h4>
          <div className="gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:px-3 px-1 md:py-2">
            {index % 2 === 0 ? (
              <>
                <BackgroundGradient className="rounded-[22px] sm:p-10 md:p-5 bg-white dark:bg-zinc-900">
                  <img
                    className="w-full rounded-[22px]"
                    src={service.image}
                    alt={service.title}
                  />
                </BackgroundGradient>
                <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl uppercase tracking-tight font-extrabold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                    {service.description}
                  </p>
                  <Link
                    to={"/contact"}
                    className="inline-flex items-center text-white bg-pink-600 duration-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 mb-5"
                  >
                    Get started
                    <CgArrowRight size={25} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl uppercase tracking-tight font-extrabold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                    {service.description}
                  </p>
                  <Link
                    to={"/contact"}
                    className="inline-flex items-center text-white bg-pink-600 duration-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 mb-5"
                  >
                    Get started
                    <CgArrowRight size={25} />
                  </Link>
                </div>
                <BackgroundGradient className="rounded-[22px] sm:p-10 md:p-5 bg-white dark:bg-zinc-900">
                  <img
                    className="w-full rounded-[22px]"
                    src={service.image}
                    alt={service.title}
                  />
                </BackgroundGradient>
              </>
            )}
          </div>
        </motion.section>
      ))}
    </>
  );
};

export default HeroRow;
