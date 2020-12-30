const { SERVER_API } = process.env;

export default {
  login: `${SERVER_API}/auth/login`,
  logout: `${SERVER_API}/auth/logout`,
  createUser: `${SERVER_API}/auth/register`,
  updateUser: (id) => `${SERVER_API}/auth/update/${id}`,
  getUser: (id) => `${SERVER_API}/user/${id}`,
  getUserWorkspaces: `${SERVER_API}/workspaces`,
  createWorkspace: `${SERVER_API}/workspaces/create`,
  updateWorkspace: (id) => `${SERVER_API}/workspaces/${id}`,
  deleteWorkspace: (id) => `${SERVER_API}/workspaces/${id}`,
  duplicateWorkspace: (id) => `${SERVER_API}/workspaces/${id}/duplicate`,
  moveTodoToWorkspace: (workspaceId, todoId) =>
    `${SERVER_API}/workspaces/${workspaceId}/todos/${todoId}`,
  createTodo: `${SERVER_API}/todos/create`,
  getTodos: `${SERVER_API}/todos/calendar`,
  updateTodo: (id) => `${SERVER_API}/todos/${id}`,
  deleteTodo: (id, calendarId) => `${SERVER_API}/todos/${id}/${calendarId}`,
  duplicateTodo: (id) => `${SERVER_API}/todos/${id}/duplicate`,
  duplicateTodosColumn: (from, to) => `${SERVER_API}/todos/${from}/${to}`,
};
