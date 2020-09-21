const ROOT_URL = '/api';

const API_ROUTES = {
  PLAYERS: `${ROOT_URL}/players`,
  RESULTS: `${ROOT_URL}/results`,
  FIXTURES: `${ROOT_URL}/fixtures`,
  USERS: `${ROOT_URL}/users`,
  POSTS: `${ROOT_URL}/posts`,
};

const ACCOUNT_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  WRITER: 'writer',
  USER: 'user',
};

module.exports = {
  PORT,
  API_ROUTES,
  ACCOUNT_ROLES,
};
