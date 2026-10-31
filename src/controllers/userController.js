const userService = require("../services/userService");

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function parseUserId(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) {
    const error = new Error("User ID must be a positive integer");
    error.statusCode = 400;
    throw error;
  }
  return id;
}

function validateUser(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name || name.length > 120) {
    const error = new Error("Name is required and must be at most 120 characters");
    error.statusCode = 400;
    throw error;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    const error = new Error("A valid email address is required");
    error.statusCode = 400;
    throw error;
  }

  return { name, email };
}

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.json({ data: users });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(parseUserId(req.params.id));
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ data: user });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(validateUser(req.body || {}));
  res.status(201).json({ data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    parseUserId(req.params.id),
    validateUser(req.body || {})
  );
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(parseUserId(req.params.id));
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ data: user });
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
