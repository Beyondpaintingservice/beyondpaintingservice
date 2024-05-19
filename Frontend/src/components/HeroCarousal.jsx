import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroCarousal = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const importImages = async () => {
			const importedImagesPromises = Array.from({ length: 10 }, (_, index) =>
				import(`../assets/carousalImg${index}.jpg`).catch(() => null)
			);

			const importedImages = await Promise.all(importedImagesPromises);
			const filteredImages = importedImages.filter((image) => image !== null);
			setImages(filteredImages);
		};

		importImages();
	}, []);
	return (
    <div className="mb-6 md:mb-14 mx-auto ">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        stopOnHover={false}
      >
        {images &&
          images.map((img, index) => (
            <div key={index} className="">
              <img src={img.default} className="object-cover max-h-screen" />
              <div className="hidden z-30 absolute h-20 top-[45%] right-[10%] md:flex justify-center items-center">
                <span className="block min-w-max p-6 bg-stone-400 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:bg-opacity-90 hover:dark:bg-opacity-30 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-200">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Everything for your house paint.
                  </h5>

                  <span className="p-6">
                    <Link to={"/services"}>
                      <button
                        type="button"
                        className="inline-flex items-center text-white hover:text-black bg-transparent border duration-200 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-pink-900 my-5"
                      >
                        Explore More
                      </button>
                    </Link>
                  </span>
                </span>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousal;
