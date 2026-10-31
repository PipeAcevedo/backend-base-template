const pool = require("../config/db");

const userFields = "id, name, email, created_at, updated_at";

async function getUsers() {
  const { rows } = await pool.query(
    `SELECT ${userFields} FROM users ORDER BY id ASC`
  );
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query(
    `SELECT ${userFields} FROM users WHERE id = $1`,
    [id]
  );

  return rows[0] || null;
}

async function createUser({ name, email }) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING ${userFields}`,
    [name, email]
  );

  return rows[0];
}

async function updateUser(id, { name, email }) {
  const { rows } = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING ${userFields}`,
    [name, email, id]
  );

  return rows[0] || null;
}

async function deleteUser(id) {
  const { rows } = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING ${userFields}`,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
