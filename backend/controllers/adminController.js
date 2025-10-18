import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminEmail || !adminPassword) {
      return res.status(500).json({
        success: false,
        message: "Admin credentials not set in environment variables",
      });
    }

    if (name !== adminName) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin name",
      });
    }

    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email",
      });
    }

    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin password",
      });
    }

    // Generate JWT
    const token = jwt.sign({ name, email,verified: true }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Admin login successful",
    });
  } catch (err) {
    console.error("adminLogin error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};
export const isAuthenticated = (req, res) => {
  try {
    const { name, email, verified } = req.admin;
    return res.json({
      success: true,
      message: "Authorized user",
      user: { verified },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const adminLogout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    // Send response
    return res.json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("logout error:", error.message);
    return res.json({
      success: false,
      message: "Logout error, please try again",
    });
  }
};
