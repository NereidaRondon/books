import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv";
import cors from "cors"
import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express()


// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

// Test route to verify backend is working
app.get("/", (req, res) => {
  res.json("Hello, this is the backend!")
}) 

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};

// Register route
app.post("/register", (req, res) => {
  const q = "INSERT INTO users (`username`, `password`) VALUES (?)";

  const values = [
    req.body.username,
    req.body.password
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Username already exists" });
      }

      return res.status(500).json({ error: "Failed to register user" });
    }

    return res.status(201).json({ message: "User registered successfully" });
  });
});

// Login route
app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Login failed" });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = data[0];

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  });
});

// Get books for logged-in user
app.get("/books", verifyToken, (req, res) => {
  const q = "SELECT * FROM books WHERE user_id = ? ORDER BY title ASC";

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch books" });
    }

    return res.status(200).json(data);
  });
});

// Get one book for logged-in user
app.get("/books/:id", verifyToken, (req, res) => {
  const bookId = req.params.id;

  const q = "SELECT * FROM books WHERE id = ? AND user_id = ?";

  db.query(q, [bookId, req.user.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch book" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json(data[0]);
  });
});

// Add a new book for logged-in user
app.post("/books", verifyToken, (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`, `user_id`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.user.id
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to add book" });
    }

    return res.status(201).json({ message: "Book added successfully", data });
  });
});

// Update a book for logged-in user
app.put("/books/:id", verifyToken, (req, res) => {
  const bookId = req.params.id;

  const q = `
    UPDATE books 
    SET title = ?, description = ?, cover = ?
    WHERE id = ? AND user_id = ?
  `;

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    bookId,
    req.user.id
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to update book" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({ message: "Book has been updated." });
  });
});

// Delete a book for logged-in user
app.delete("/books/:id", verifyToken, (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM books WHERE id = ? AND user_id = ?";

  db.query(q, [bookId, req.user.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to delete book" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({ message: "Book has been deleted." });
  });
});


// Start the server
app.listen(3000, () => {
  console.log("Connected to backend!")
})