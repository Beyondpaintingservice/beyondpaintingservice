import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
//absolute bottom-0 w-80 text-center bg-black bg-opacity-70 text-white py-2 px-4 lg:px-4 opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0
{
  /* <DeleteOutlined /> */
}
const Images = ({ data, fetchGallery }) => {
  // const {image, imageTitle} = data

  // const user = useSelector((store) => store.user.userDetails);

  const deleteImage = async (id) => {
    try {
      const response = await axios.delete(
        "https://beyondpaintingservice.onrender.com/api/v1/gallery/delete-image",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE5NzM0NTEzLCJleHAiOjE3NTQyOTQ1MTN9.eLFKqeI9bxoJp87ZTVOio4LocIpc22ghkfWR9Ta_nMs`,
          },
          data: { _id: id },
        }
      );
      console.log("delete id", id);
      console.log(response);
      fetchGallery();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative w-[350px] p-2 overflow-hidden group">
      <img
        src={data.image}
        alt={data.imageTitle}
        className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
      <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white py-2 opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center">
        <DeleteOutlined
          style={{ fontSize: "24px", color: "red", marginRight: "8px" }}
          onClick={() => deleteImage(data._id)}
        />
        <span>{data.imageTitle}</span>
      </span>
    </div>
  );
};

const AddImage = () => {
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchApiForAddImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("imageTitle", imageTitle);
    formData.append("pageTitle", pageTitle);

    try {
      const response = await axios.post(
        "https://beyondpaintingservice.onrender.com/api/v1/gallery/add-image",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE5NzM0NTEzLCJleHAiOjE3NTQyOTQ1MTN9.eLFKqeI9bxoJp87ZTVOio4LocIpc22ghkfWR9Ta_nMs`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Image upload failed");
      }

      console.log(response.data.data);
      toast.success(response.data.message || "Image uploaded successfully");
      console.log("mytoust");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Add Image</h1>
      <form
        onSubmit={fetchApiForAddImage}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="imageTitle"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            IMAGE TITLE
          </label>
          <input
            id="imageTitle"
            type="text"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            placeholder="Type image name"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pageTitle"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            PAGE TITLE
          </label>
          <input
            id="pageTitle"
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Give page name"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            IMAGE
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            required
            className="w-full  dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Image
        </button>
      </form>
    </div>
  );
};

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [addImages, setAddImages] = useState(false);

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
      <span
        onClick={() => setAddImages(!addImages)}
        className="py-3 px-5 bg-blue-700 text-white cursor-pointer mt-40"
      >
        Add New Images
      </span>
      {addImages && <AddImage />}

      <div className="flex flex-wrap justify-center mx-auto p-4 g-4">
        {images &&
          images.map((img) => (
            <Images key={img._id} data={img} fetchGallery={fetchGallery} />
          ))}
      </div>
    </div>
  );
};

export default AdminGallery;
