const { SERVER_API } = process.env;

export default {
  login: `${SERVER_API}/auth/login`,
  logout: `${SERVER_API}/auth/logout`,
  createUser: `${SERVER_API}/auth/register`,
  updateUser: (id) => `${SERVER_API}/auth/update/${id}`,
  getUser: (id) => `${SERVER_API}/user/${id}`,
  getProfile: (username) => `${SERVER_API}/auth/profile/${username}`,
  followUser: `${SERVER_API}/auth/follow`,
  createLink: `${SERVER_API}/links/create`,
  updateLink: (id) => `${SERVER_API}/links/${id}`,
  deleteLink: (id) => `${SERVER_API}/links/${id}`,
  getLink: (id) => `${SERVER_API}/links/${id}`,
  getLinks: `${SERVER_API}/links`,
  getWaitings: `${SERVER_API}/links/me/waitings`,
  addWaiting: (linkId) => `${SERVER_API}/links/${linkId}/waitings/add`,
  removeWaiting: (linkId) => `${SERVER_API}/links/${linkId}/waitings/remove`,
  getAnalytics: (id) => `${SERVER_API}/links/${id}`,
};
