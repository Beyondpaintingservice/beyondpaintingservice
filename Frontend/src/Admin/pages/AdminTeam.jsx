/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Team = ({ team }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="w-2/3 sm:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex  justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          onClick={toggleDropdown}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>

        <div
          id="dropdown"
          // ref={dropdownRef}
          className={`z-10 ${
            dropdownVisible ? "" : "hidden"
          } text-base list-none absolute mt-8 ml-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Edit
            </li>

            <li className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Delete
            </li>
          </ul>
        </div>
      </div>
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

const AddTeam = ({ fetchTeam }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [designation, setDesiganation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("designation", designation);

    if (photo) formData.append("photo", photo);

    const response = await axios.post(
      "https://beyondpaintingservice.onrender.com/api/v1/team/add-member",
      formData,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE5NzMzNjA1LCJleHAiOjE3MTk4MjAwMDV9.bpG49TuqVbs_ExapeAfhHJLc0e7yoknDAhr-f2gMibI`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    fetchTeam();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="designation"
        >
          Designation
        </label>
        <input
          id="designation"
          name="designation"
          type="text"
          value={designation}
          onChange={(e) => setDesiganation(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photo"
        >
          Photo
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="  w-full py-2 px-3 "
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const AdminTeam = () => {
  const [myteams, setTeams] = useState([]);
  const [addteam, setTeam] = useState(false);

  const fetchTeam = async () => {
    const response = await axios.get(
      "https://beyondpaintingservice.onrender.com/api/v1/team/get-members"
    );
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
      <div>
        <button
          className=" bg-blue-600 p-2 rounded-lg text-white"
          onClick={() => setTeam(!addteam)}
        >
          ADD TEAM
        </button>
        {addteam && <AddTeam fetchTeam={fetchTeam} />}
      </div>
      <div className="flex mt-5 justify-center flex-wrap items-center gap-5">
        {myteams && myteams.map((team) => <Team key={team?._id} team={team} />)}
      </div>
    </div>
  );
};

export default AdminTeam;
