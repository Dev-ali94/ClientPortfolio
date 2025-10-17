import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token; // get token from cookies
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach decoded admin info to request
    next(); // proceed to next middleware / controller
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
