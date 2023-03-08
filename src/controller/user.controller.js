const { client } = require("../modals");
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
  const { name, email, password, date } = req.body;
  try {
    const response = await client.query(
      `INSERT INTO register(name, email, password, date_of_registration) VALUES ( '${name}', '${email}', '${password}', '${date}') RETURNING id`
    );
    console.log("res", response.rows);
    // res.send(response.rows[0]);
    res.status(200).json({
      id: response.rows[0].id,
      email,
      // token: generateToken(response.rows[0].id),
      message: "Account Created Successfully! Please Login",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  } finally {
    client.end;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await client.query(
      `SELECT * FROM "register" WHERE email =  $1`,
      [email]
    );
    console.log(response.rows);
    if (email != response.rows[0].email) {
      res.status(400).json({
        isLoggedIn: false,
        message: "Check your email",
      });
      return;
    }
    if (password != response.rows[0].password) {
      res.status(400).json({
        isLoggedIn: false,
        message: "Your password is incorrect",
      });
      return;
    }
    console.log("token", generateToken(response.rows[0].id));
    res.status(200).json({
      ...response.rows[0],
      isLoggedIn: true,
      message: "You are successfully logged in",
      token: generateToken(response.rows[0].id),
      // token,
    });
  } catch (err) {
    console.log(err);
    res.send({
      isLoggedIn: false,
      message: err.message,
      err,
    });
  }
};

const auth = async (req, res) => {
  const token = req.params.token;
  try {
    if (!token || token === null) {
      res.status(401).json({ message: "Not Authorized, no token found" });
    }

    let finalToken = token.replace(/"/g, "");
    // Verify the token
    const decoded = jwt.verify(
      finalToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          res.status(401).json("token expired");
        } else {
          res.status(200).json({
            message: "Token alive"
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
const getUser = async (req, res) => {
  const token = req.params.token;
  try {
    if (!token || token === null) {
      res.status(401).json({ message: "Not Authorized, no token found" });
    }

    let finalToken = token.replace(/"/g, "");
    // Verify the token
    const decoded = jwt.verify(
      finalToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          res.status(401).json("token expired");
        } else {
          const response = await client.query(
            `SELECT * FROM "register" WHERE id =  $1`,
            [decoded.id]
          );
          res.status(200).json({
            ...response.rows[0]
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });
};
module.exports = { signup, login, auth, getUser };
