import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv";
import cors from "cors"

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

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

// Test route to verify backend is working
app.get("/", (req, res) => {
  res.json("Hello, this is the backend!")
})  

// Route to get all books
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch books" })
        }
        return res.status(200).json(data)
    })
})

// Route to add a new book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]
    // Using an array of values to match the placeholders in the SQL query
    db.query(q, [values], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to add book" })
        }
        return res.status(201).json({ message: "Book added successfully", data })
    })
})

// Start the server
app.listen(3000, () => {
  console.log("Connected to backend!")
})