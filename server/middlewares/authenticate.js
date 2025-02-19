// middlewares/authenticate.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to authenticate the user based on the JWT token
export const authenticate = async (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to the request object
      req.userId = decoded.userId;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token" });
  }
};
