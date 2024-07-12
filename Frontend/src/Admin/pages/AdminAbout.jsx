import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminAbout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.user.userDetails);

  const fetchAbout = async () => {
    try {
      const response = await fetch(
        "https://beyondpaintingservice.onrender.com/api/v1/about/get-about"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch about data");
      }

      const data = await response.json();
      console.log(data);
      setTitle(data?.data?.title);
      setDescription(data?.data?.description);
      setPhoto(data?.data?.photo);
      // console.log(data?.data)
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }
    console.log(user);
    try {
      const response = await fetch(
        "https://beyondpaintingservice.onrender.com/api/v1/about/add-about",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update about data");
      }
      console.log("About data added or updated");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:pt-10 dark:text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Update & Edit AdminAbout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-gray-900  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:shadow-outline ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AdminAbout;
