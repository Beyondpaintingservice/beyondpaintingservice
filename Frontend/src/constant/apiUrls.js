// Local server url
// const backEndHost = `http://localhost:8080`;

// Hosted server url
const backEndHost = `https://beyondpaintingservice.onrender.com`;

export const loginAdminApi = `${backEndHost}/api/v1/admin/login`;
export const submitContactApi = `${backEndHost}/api/v1/contacts/submit-contact`;
export const getGalleryImagesApi = `${backEndHost}/api/v1/gallery/get-images`;
export const getMembersApi = `${backEndHost}/api/v1/team/get-members`;
export const getServicesApi = `${backEndHost}/api/v1/services/get-services`;
export const getContactDetailsApi = `${backEndHost}/api/v1/services/get-services`;

export const deleteTeamMemberApi = `${backEndHost}/api/v1/team/delete-member`;
export const addTeamMemberApi = `${backEndHost}/api/v1/team/add-member`;
