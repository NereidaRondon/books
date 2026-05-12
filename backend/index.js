import express from "express"
import mysql from "mysql2"

// Create an instance of the Express application
const app = express()

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "database@1984",
  database: "books_crud_app"
})

// Middleware to parse JSON bodies
app.use(express.json())

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