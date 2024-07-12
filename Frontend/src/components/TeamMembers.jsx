import { useState, useEffect } from "react";
import axios from "axios";
import MemberCard from "./MemberCard";
import { getMembersApi } from "../constant/apiUrls";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(getMembersApi);
      setTeamMembers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <section className="member-section flex md:my-7 gap-5 md:gap-x-36 md:gap-y-20 flex-wrap justify-center items-center mx-auto mb-20">
      {isLoading ? (
        <p>Loading team members...</p>
      ) : (
        teamMembers.map((member) => (
          <MemberCard
            key={member._id}
            imageUrl={
              member.photo ||
              "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            }
            name={member.name}
            designation={member.designation}
            contactURL={member.contactURL}
          />
        ))
      )}
    </section>
  );
};

export default TeamMembers;
