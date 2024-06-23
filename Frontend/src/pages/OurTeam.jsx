import ContentWrapper from "../components/ContentWrapper";
import TeamMembers from "../components/TeamMembers";

const OurTeam = () => {
	return (
    <ContentWrapper>
      <div className="min-h-screen pt-20 dark:text-white">
        {/* Team Member Section */}
        <h1 className="text-3xl font-bold text-start mx-auto max-w-screen-4xl ">
          Our Working Team
        </h1>
        <TeamMembers />
      </div>
    </ContentWrapper>
  );
};

export default OurTeam;
