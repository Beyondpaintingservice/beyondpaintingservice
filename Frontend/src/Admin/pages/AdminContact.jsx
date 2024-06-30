import { useEffect, useState } from "react";

const EachContact = ({ data }) => {
  const { email, fullName, message, phone } = data || {};

  if (!data) {
    return (
      <tr>
        <td colSpan="4">No contact data available.</td>
      </tr>
    );
  }

  return (
    <tr className="border border-gray-200">
      <td className="border border-gray-200 px-4 py-2">{email}</td>
      <td className="border border-gray-200 px-4 py-2">{fullName}</td>
      <td className="border border-gray-200 px-4 py-2">{message}</td>
      <td className="border border-gray-200 px-4 py-2">{phone}</td>
    </tr>
  );
};

const AdminContact = () => {
  const [contactInfo, setContactInfo] = useState([]);

  const fetchContact = async () => {
    const data = await fetch(
      "https://beyondpaintingservice.onrender.com/api/v1/contacts/get-contacts",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3YTFmZmI2MmFkZjViZjhiODUzNTkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzE5NzMzNjA1LCJleHAiOjE3MTk4MjAwMDV9.bpG49TuqVbs_ExapeAfhHJLc0e7yoknDAhr-f2gMibI`,
        },
      }
    );
    // console.log(data)
    const json = await data.json();
    setContactInfo(json?.data);
    console.log(json?.data);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="min-h-screen md:pt-10 dark:text-white">
      <h1>AdminContact</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 bg-gray-200">
              Email
            </th>
            <th className="border border-gray-400 px-4 py-2 bg-gray-200">
              Name
            </th>
            <th className="border border-gray-400 px-4 py-2 bg-gray-200">
              Message
            </th>
            <th className="border border-gray-400 px-4 py-2 bg-gray-200">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {contactInfo?.length > 0 ? (
            contactInfo?.map((contact) => (
              <EachContact key={contact._id} data={contact} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No contact data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;
