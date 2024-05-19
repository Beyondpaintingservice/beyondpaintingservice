import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { reuseInputClassnames } from "../constant/adminConstants";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../store/slices/userSlice";
import ContentWrapper from "../components/ContentWrapper";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import GoogleMap from "../components/GoogleMap";
import { submitContactApi } from "../constant/apiUrls";

const ContactUs = () => {
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (userData?.token || user?.token) {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const password = watch("password");

  const onSubmit = async (localData) => {
    try {
      // console.log(previewSource);

      const headersList = {
        Accept: "*/*",
      };

      const formData = new FormData();
      formData.append("fullName", localData.fullName);
      formData.append("email", localData.email);
      formData.append("password", localData.password);
      formData.append("role", localData.role);

      const bodyContent = formData;

      const reqOptions = {
        url: submitContactApi,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      const { data } = await axios.request(reqOptions);
      console.log(data);

      if (!data.token) {
        return toast.error(data.message || "User Adding Failed");
      }

      dispatch(setUser(data));
      setUserData(data);
      // console.log(data);
      return toast.success(`${data?.message || "Successfully Registered!"}`);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error + " Slow Internet !" ||
          "Error occurred during Registering."
      );
    }
  };

  return (
    <ContentWrapper>
      <h2 className="text-2xl md:pt-20 font-bold text-gray-800 lg:text-3xl dark:text-white text-start">
        Contact us
      </h2>
      <div className="w-full flex flex-col justify-center items-center md:flex-row md:items-start">
        <div className="left h-full">
          <section className="py-6 px-8   mt-5 rounded-l-md dark:bg-gray-900 h-full text-gray-900 dark:text-white ">
            <div className="py-6 md:py-0 md:px-6">
              <h1 className="text-4xl font-bold">Get in touch</h1>
              <p className="pt-2 pb-4">
                Fill in the form to start a conversation
              </p>
              <div className="space-y-4">
                <p className="flex items-center gap-2 ms:gap-5">
                  <FaLocationDot size={25} />
                  <span>Fake address, 9999 City</span>
                </p>
                <p className="flex items-center gap-2 ms:gap-5">
                  <BsFillTelephoneFill size={20} />
                  <span className="flex flex-col ">
                    <a href="tel:+91 6003105660" className="font-semibold">
                      +91 01234-56789
                    </a>

                    <a href="tel:+91 9101247335" className="font-semibold">
                      +91 91012-47335
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2 ms:gap-5">
                  <IoMdMail size={26} />
                  <a href="mailto:">contact@business.com</a>
                </p>
              </div>
            </div>
          </section>

          <section
            id="mapSection"
            className="md:max-w-[34rem] dark:text-white text-justify overflow-hidden"
          >
            <GoogleMap />
          </section>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-7xl p-6 mt-5 space-y-8 sm:p-8 bg-white rounded-r-lg rounded-b-lg shadow dark:shadow shadow-slate-600 dark:bg-gray-800">
            <div>
              <h2 className="text-xl text-gray-900 dark:text-white ">
                <span className="font-semibold">
                  Plan your event with ease!
                </span>
              </h2>
              <h2 className="text-xl text-gray-900 dark:text-white pt-3">
                Contact us using the form below to your dream house experience.
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="fullName"
                  className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                  <span className="text-red-600 ml-1 font-medium">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", { required: true })}
                  className={`${reuseInputClassnames}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Full Name is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                >
                  Email <span className="text-red-600 ml-1 font-medium">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className={`${reuseInputClassnames}`}
                  placeholder="email@company.com"
                />
                {errors.email && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Email is required
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                >
                  Phone No.
                  <span className="text-red-600 ml-1 font-medium">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", { required: true, minLength: 10 })}
                  className={`${reuseInputClassnames}`}
                  placeholder="Enter your phone no."
                  autoComplete="off"
                />
                {errors.phone && errors.phone.type === "required" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Phone no is required.
                  </span>
                )}
                {errors.phone && errors.phone.type === "minLength" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Phone must have at least 10 characters
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                >
                  Message
                  <span className="text-red-600 ml-1 font-medium">*</span>
                </label>
                <textarea
                  type="text"
                  id="message"
                  {...register("message", { required: true, minLength: 10 })}
                  className={`${reuseInputClassnames}`}
                  placeholder="Type your message."
                  autoComplete="off"
                  rows={8}
                />
                {errors.message && errors.message.type === "required" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Message is required.
                  </span>
                )}
                {errors.message && errors.message.type === "minLength" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Message must have at least 10 characters
                  </span>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="min-w-full min px-5 py-3 text-base font-medium text-center text-white bg-pink-600 hover:bg-pink-800 dark:hover:bg-pink-900 duration-200 ease-out dark:bg-pink-700 rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto   dark:focus:ring-blue-800 flex justify-center items-center disabled:cursor-wait"
              >
                <span className="mr-2 ">Send Query</span>
                {isSubmitting && (
                  <span className="pt-1 ">
                    <Spinner className="w-5 h-5 " />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ContactUs;
