import ContentWrapper from "../components/ContentWrapper";
import ServicesCard from "../components/ServicesCard";

const Services = () => {
	return (
    <ContentWrapper>
      <section className="min-h-screen w-full pt-20 dark:text-white">
        <h1 className="text-xl pb-5 md:pb-0 md:text-3xl font-bold text-start mx-auto max-w-screen-4xl capitalize">
          Our Services, We are more than just Painters!
        </h1>

        <div className="">
          <section className="services-section flex md:my-7 gap-5 md:gap-x-36 md:gap-y-20 flex-wrap justify-center items-center mb-20 mx-4">
            <ServicesCard
              title="Interior Painting"
              description="Adding a fresh coat of paint can completely transform the interior of your home. But painting shouldn’t be a chore. That's why we has simplified the painting experience. With expert painters and quality standards, we can get your job done."
              imageUrl="https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg"
            />
            <ServicesCard
              title="EXTERIOR PAINTING"
              description="House exterior painting is crucial for several reasons ranging from aesthetic appeal to protection and preservation of your abode. When it comes to exterior building painting, we recommend you consider hiring professional help as painting your home exterior is much more daunting and labour-intensive in comparison to painting your interior walls."
              imageUrl="https://assets-news.housing.com/news/wp-content/uploads/2021/10/28225854/Best-colours-for-home-outside-1200x700-shutterstock_108400937-compressed.jpg"
            />
            <ServicesCard
              title="CABINET PAINTING"
              description="Painting or staining cabinets can be the most effective way to give a kitchen a facelift. Our paint crews are skilled in cabinet painting and staining. We can handle your cabinet painting project, giving you a space that you’ll be proud to spend time in."
              imageUrl="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(102).webp"
            />
            <ServicesCard
              title="CUSTOM PAINTING"
              description="When just a change of wall color isn’t enough, We offers custom painting options, like murals, decorative wall art, stenciling, and logo painting. So, if you want to add some personality to a nursery or your home office, contact us!"
              imageUrl="https://www.paintzen.com/wp-content/uploads/2018/09/cabinets1-1.jpg"
            />
          </section>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default Services;
