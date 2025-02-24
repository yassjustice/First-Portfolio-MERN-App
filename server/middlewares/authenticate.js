// middlewares/authenticate.js
import jwt from "jsonwebtoken";

// Middleware to authenticate the user based on the JWT token
export const authenticate = async (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        console.error("🔹 No token found in Authorization header");
        return res.status(401).json({ message: "Unauthorized, no token" });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("🔹 Token verified, User ID:", decoded.userId); // Log the user ID

      // Attach the user information to the request object
      req.userId = decoded.userId;

      // Proceed to the next middleware or route handler
      return next();
    } catch (error) {
      console.error("🔹 Token verification failed:", error.message); // Log verification error
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  }

  // If the Authorization header is not provided
  console.error("🔹 No Authorization header provided");
  return res.status(401).json({ message: "Unauthorized, no token" });
};
