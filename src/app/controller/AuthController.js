const {
  registerServices,
  loginServices,
  meServices,
} = require("../services/AuthServices");

const register = async (req, res) => {
  try {
    // validating fields
    const { name, email, career, password } = req.body;

    if (!name || name === "") {
      return res.status(400).json({
        error: "the name field is required",
      });
    }
    if (!email || email === "") {
      return res.status(400).json({
        error: "the email field is required",
      });
    }
    if (!career || career === "") {
      return res.status(400).json({
        error: "the career field is required",
      });
    }
    if (!password || password === "") {
      return res.status(400).json({
        error: "the password field is required",
      });
    }

    // service
    const response = await registerServices(req);

    if (response.error) {
      return res.status(400).json({
        error: response.error,
      });
    }

    return res.json(response.data);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    // validating fields
    const { email, password } = req.body;

    if (!email || email === "") {
      return res.status(400).json({
        error: "the email field is required",
      });
    }
    if (!password || password === "") {
      return res.status(400).json({
        error: "the password field is required",
      });
    }

    // login services
    const response = await loginServices(req);

    if (response.error) {
      return res.status(400).json({
        error: response.error,
      });
    }

    return res.json(response.data);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const me = async (req, res) => {
  const auth_id = await res.locals.auth_data.id;

  const response = await meServices(auth_id);

  if (response.error) {
    return res.status(400).json({
      error: response.error,
    });
  }

  return res.json(response.data);
};

module.exports = {
  register,
  login,
  me,
};
