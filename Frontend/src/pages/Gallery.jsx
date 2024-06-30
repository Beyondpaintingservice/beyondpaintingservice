import { useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import ImageCard from "../components/ImageCard";
import SkeletonCard from "../components/SkeletonCard";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import axios from "axios";
import { getGalleryImagesApi } from "../constant/apiUrls";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(getGalleryImagesApi);
        setImages(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <ContentWrapper>
      <div className="min-h-screen pt-20 dark:text-white">
        <h1 className="text-3xl font-bold text-start mx-auto max-w-screen-4xl ">
          Gallery
        </h1>

        <div className="bg-white dark:bg-gray-950 duration-700 sm:py-5 lg:py-2">
          <div className="mx-auto max-w-screen-4xl px-4 md:px-8">
            <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12"></div>

            <div className="grid grid-cols-2 items-start gap-4 sm:grid-cols-3 md:gap-7 xl:gap-8">
              {images &&
                !isLoading &&
                images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ marginTop: "100vh" }}
                    animate={{ marginTop: "0px" }}
                    className="group relative flex h-auto w-auto items-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-950 duration-700 shadow-lg object-cover object-center"
                  >
                    <ImageCard
                      img={image.image}
                      className="inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 "
                    />
                  </motion.div>
                ))}
            </div>
          </div>
          {isLoading && (
            <div className="inset-0 mt-5 md:gap-3 h-full flex justify-center items-center flex-wrap w-full object-cover object-center transition duration-200 group-hover:scale-110">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <span className="flex justify-center items-center w-full my-4">
                <Spinner className="text-red-700 w-7 h-7 text-4xl" />
              </span>
            </div>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Gallery;
