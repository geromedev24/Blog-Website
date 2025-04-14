const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ error: "Access Denied. No token provided" });
  }

  const token = authHeader.substring(7);

  try {
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session Expired.  Please login again." });
    }
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({ error: "Access Denied. Invalid token." });
  }
};

module.exports = {
  authMiddleware,
};
