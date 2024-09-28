export const AppConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || "DEVELOPMENT",
  frontend: process.env.FRONTEND || "*",
  jwtSecret: process.env.JWT_SECRET,
  salt: process.env.SALT,
  firebaseEmail: process.env.FIREBASE_EMAIL,
  firebaseKey: process.env.FIREBASE_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
});
