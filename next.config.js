module.exports = {
  distDir: '_next',
  generateBuildId: async () => {
    const id = process.env.BUILD_ID;
    return id;
  },
  env: {
    SERVER_API: process.env.SERVER_API,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
};
