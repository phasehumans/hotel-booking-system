import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  try {
    if (decodedData) {
      req.id = decodedData.id;
      req.role = decodedData.role;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "you are not sign in",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
      error: error.message,
    });
  }
};

export const checkOwner = async (req, res, next) => {
  const role = req.role;

  try {
    if (role.toLowerCase() != "owner") {
      return res.status(403).json({
        success: false,
        message: "unauthorized access; owner only",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
      error: error.message,
    });
  }
};

export const checkCustomer = async (req, res, next) => {
  const role = req.role;

  try {
    if (role.toLowerCase() != "customer") {
      return res.status(403).json({
        success: false,
        message: "unauthorized access; customer only",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
      error: error.message,
    });
  }
};
