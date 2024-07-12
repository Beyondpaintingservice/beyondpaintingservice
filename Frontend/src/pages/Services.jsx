import { useState, useEffect } from "react";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import ServicesCard from "../components/ServicesCard";
import { getServicesApi } from "../constant/apiUrls";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(getServicesApi);
      setServices(response.data.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ContentWrapper>
      <section className="min-h-screen w-full md:pt-20 dark:text-white">
        <h1 className="text-xl pb-5 md:pb-0 md:text-3xl font-bold text-start mx-auto max-w-screen-4xl capitalize">
          Our Services, We are more than just Painters!
        </h1>

        <div className="">
          <section className="services-section flex md:my-7 gap-5 md:gap-x-36 md:gap-y-20 flex-wrap justify-center items-center mb-20 mx-4">
            {isLoading ? (
              <p>Loading services...</p>
            ) : (
              services.map((service) => (
                <ServicesCard
                  key={service._id}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.image}
                />
              ))
            )}
          </section>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default Services;
