const { SERVER_API } = process.env;

export default {
  login: `${SERVER_API}/auth/login`,
  logout: `${SERVER_API}/auth/logout`,
  createUser: `${SERVER_API}/auth/register`,
  updateUser: (id) => `${SERVER_API}/auth/update/${id}`,
  getUser: (id) => `${SERVER_API}/user/${id}`,
  createLink: `${SERVER_API}/links/create`,
  updateLink: (id) => `${SERVER_API}/links/${id}`,
  deleteLink: (id) => `${SERVER_API}/links/${id}`,
  getLink: (id) => `${SERVER_API}/links/${id}`,
  getLinks: `${SERVER_API}/todos`,
  getAnalytics: (id) => `${SERVER_API}/links/${id}`,
};
