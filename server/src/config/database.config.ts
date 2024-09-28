export const DatabaseConfig = () => ({
  mongo: {
    uri: process.env.DATABASE_URI || "mongodb://localhost:27017/massagista",
  },
});
