import { useState, useEffect } from "react";
import axios from "axios";

const Images = ({ data, fetchGallery }) => {
  // const {image, imageTitle} = data
  // console.log(data);
  return (
    <div className="relative w-[350px] p-2 overflow-hidden group">
      <img
        src={data.image}
        alt={data.imageTitle}
        className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
      <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white py-2 opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center">
        <span>{data.imageTitle}</span>
      </span>
    </div>
  );
};

const HomeImages = () => {
  const [images, setImages] = useState([]);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        "https://beyondpaintingservice.onrender.com/api/v1/gallery/get-images"
      );
      setImages(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching the gallery images:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);
  return (
    <div className="min-h-screen dark:text-white">
      <div className="flex flex-wrap justify-center mx-auto p-4 g-4">
        {images &&
          images.map((img) => (
            <Images key={img._id} data={img} fetchGallery={fetchGallery} />
          ))}
      </div>
    </div>
  );
};

const Team = ({ team }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const dropdownRef = useRef(null);

  //   const toggleDropdown = () => {
  //     setDropdownVisible(!dropdownVisible);
  //   };

  return (
    <div className="w-2/3 sm:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex  justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={team?.photo}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {team.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {team.designation}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Phone: {team.phone}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Email: {team.email}
        </span>
      </div>
    </div>
  );
};
const HomeTeams = () => {
  const [myteams, setTeams] = useState([]);
  const [addteam, setTeam] = useState(false);

  const fetchTeam = async () => {
    const getTeamUrl = `${import.meta.env.VITE_API_BASE_URL}${
      import.meta.env.VITE_API_GET_MEMBERS
    }`;
    console.log(getTeamUrl);
    const response = await axios.get(getTeamUrl);
    setTeams(response?.data.data);
    console.log(response);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const data = {
    name: "Mukul",
    email: "mkanojia1996@gmail.com",
    phone: "9767351086",
    photo: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    designation: "King Of World",
  };

  return (
    <div className="min-h-screen md:pt-10 dark:text-white">
      <div className="flex mt-5 justify-center flex-wrap items-center gap-5">
        {myteams && myteams.map((team) => <Team key={team?._id} team={team} />)}
      </div>
    </div>
  );
};
const AdminDashboard = () => {
  return (
    <div>
      <HomeImages />
      <div className="flex justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold text-center p-4 text-blue-600">
          MY TEAM
        </h1>
      </div>
      <HomeTeams />
    </div>
  );
};

export default AdminDashboard;
