import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = ({ services, fetchServices }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(services.title);
  const [description, setDescription] = useState(services.description);
  const [image, setImage] = useState(services.image);
  const [imageFile, setImageFile] = useState(null);
  const id = services?._id;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("_id", id);
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", image);
    }

    // Log the FormData fields
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // console.log(formData)

    // Handle save logic here
    const response = await axios.patch(
      "https://beyondpaintingservice.onrender.com/api/v1/services/update-service",
      formData,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE3OTE1MjAxLCJleHAiOjE3MTgwMDE2MDF9.jGAuHvxKvUTT9NSMgZDImGbIzRhNPFbMtPtqiFNg57A`,
        },
      }
    );
    console.log(response);
    setEdit(false);
    fetchServices();
  };

  const handleDelete = async () => {
    try {
      console.log(id);
      const response = await axios.delete(
        "https://beyondpaintingservice.onrender.com/api/v1/services/delete-service",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE3OTE1MjAxLCJleHAiOjE3MTgwMDE2MDF9.jGAuHvxKvUTT9NSMgZDImGbIzRhNPFbMtPtqiFNg57A`,
          },
          data: {
            _id: id,
          },
        }
      );
      console.log(response);
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-3/4 p-4 rounded-lg shadow-lg">
      {edit ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold mb-4 w-full p-2"
        />
      ) : (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}

      <div className="flex p-2">
        <div className="mr-4">
          <img src={image} className="w-40 h-auto rounded-lg" alt={title} />
          {edit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          )}
        </div>
        <div className="flex-1">
          {edit ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 w-full p-2"
            />
          ) : (
            <p className="mb-4">{description}</p>
          )}
          <p className="text-blue-500">
            <Link to={services.readMoreLink}>Read More</Link>
          </p>
          <div className="mt-4">
            <button
              className="py-1 px-2 bg-blue-500 rounded text-white"
              onClick={edit ? handleSave : () => setEdit(true)}
            >
              {edit ? "SAVE" : "EDIT"}
            </button>
            <button
              className="py-1 px-2 bg-red-500 rounded ml-2 text-white"
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddServices = ({ fetchServices }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://beyondpaintingservice.onrender.com/api/v1/services/add-service",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE3OTE1MjAxLCJleHAiOjE3MTgwMDE2MDF9.jGAuHvxKvUTT9NSMgZDImGbIzRhNPFbMtPtqiFNg57A`,
          },
        }
      );
      console.log(response.data);
      fetchServices();
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white w-3/4 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">ADD SERVICES</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
          className="text-2xl mx-2 w-full font-normal"
        />
        <div className="flex p-2">
          <div className="flex-1">
            <textarea
              placeholder="Add Description"
              value={description}
              onChange={handleDescriptionChange}
              className="mb-4 mx-2 w-full p-2"
            />
            <div className="mr-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="py-1 px-2 bg-blue-500 rounded text-white"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const AdminServices = () => {
  const [service, setService] = useState([]);

  const user = useSelector((store) => store.user.userDetails);
  console.log(user?.token);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://beyondpaintingservice.onrender.com/api/v1/services/get-services"
      );
      console.log(response);
      setService(response?.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const data = {
    _id: "piwefojp7094i4rj92709cjei02349",
    title: "My First Title",
    description: "why services are the best",
    image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    readMoreLink: "jodfiwi",
  };
  return (
    <div className="min-h-screen md:pt-10 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">AdminServices</h1>
      <div className="flex flex-col justify-center items-center gap-3">
        {service &&
          service.map((data) => (
            <Services
              key={data._id}
              services={data}
              fetchServices={fetchServices}
            />
          ))}
      </div>
      {/* add data */}
      <div className="flex flex-col justify-center items-center mt-5">
        <AddServices fetchServices={fetchServices} />
      </div>
    </div>
  );
};

export default AdminServices;
