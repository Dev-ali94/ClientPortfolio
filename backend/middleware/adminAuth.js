import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, unauthorized" });
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // token is valid, continue
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
