import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password,name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Name Email and password  required" });
    }
    const adminName =process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check env variables
    if (!adminEmail || !adminPassword || !adminName) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid environment credentials" });
    }

    // Check email
    if (email !== adminEmail) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials email" });
    }
      // Check name
    if (name !== adminName) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials name" });
    }

    // Check password
    if (password !== adminPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials password" });
    }

    // Generate JWT
    const token = jwt.sign({name,email,password}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.json({ success: true, message: "Admin login successful" });
  } catch (err) {
    console.error("adminLoginEnv error:", err);
    return res.status(500).json({ success: false, message: "Login error" });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token, not authenticated" });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
