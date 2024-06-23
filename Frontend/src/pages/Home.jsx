import HeroCarousal from "../components/HeroCarousal";
import HeroRow from "../components/HeroRow";
// import Spinner from "../components/Spinner";

const Home = () => {
	return (
    <div className="pt-20">
      <HeroCarousal />
      <HeroRow />
      {/* <Spinner /> */}
    </div>
  );
};

export default Home;
