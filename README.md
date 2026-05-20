# Lectora - Book Tracker

Developed by: **Nereida Rondon**

Repository: [https://github.com/NereidaRondon/books](https://github.com/NereidaRondon/books)

Website: [https://lectorabooks.netlify.app/](https://lectorabooks.netlify.app/)

## About The Project

**Lectora** is a full-stack book tracking app designed to help users keep a record of books they have already read. Users can add books to their collection, view their completed reads, update book information, and delete books from the list.

Each book entry includes a title, description, and cover image URL. If a cover image is missing the app displays a default cover image so the layout remains clean and consistent.

This project was built to using a React frontend, a Node/Express backend, and a MySQL database. 

## Built With

- React
- Bootstrap
- React Router
- Node.js
- Express.js
- Axios
- MySQL



## Getting Started

To run this project locally, clone the repository and install the required dependencies for both the frontend and backend.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MySQL

### Installation

1. Clone the repository

```bash
git clone https://github.com/NereidaRondon/books.git
```

2. Navigate into the project folder

```bash
cd books
```

3. Install frontend dependencies

```bash
cd client
npm install
```

4. Install backend dependencies

```bash
cd ../backend
npm install
```

5. Create a MySQL database

Open MySQL Workbench or your preferred MySQL tool and create a new database:

```sql
CREATE DATABASE lectora_books;
```

Then select the database:

```sql
USE lectora_books;
```

6. Create the required tables

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover VARCHAR(1000),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

7. Optional: Add a test user

```sql
INSERT INTO users (username, password)
VALUES ('guest', 'password1');
```

8. Create a `.env` file in the `backend` folder

Inside the `backend` folder, create a file named `.env` and add your MySQL database credentials:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=lectora_books
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
```

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lectora_books
DB_PORT=3306
JWT_SECRET=lectora_books_app_secret_key
```

9. Start the backend server

From the `backend` folder, run:

```bash
npm run dev
```

Or, if using the production start script:

```bash
npm start
```

10. Open a second terminal and start the frontend development server

From the project root, run:

```bash
cd client
npm run dev
```

11. Open the local frontend URL in your browser

Vite will usually provide a local URL such as:

```text
http://localhost:5173
```

## Important Note

This project uses a React frontend, an Express backend, and a MySQL database. The frontend alone will not provide full functionality unless the backend server is also running and connected to a MySQL database.

The deployed Netlify version may display the frontend, but features such as login, adding books, editing books, deleting books, and viewing user-specific books require a running backend API and database.


## Skills Applied

This project allowed me to apply and strengthen the following skills:

- Creating a full-stack application with separate frontend and backend folders
- Building reusable React components
- Managing state with `useState`
- Fetching data with `useEffect`
- Navigating between pages with React Router
- Using dynamic route parameters with `useParams`
- Sending HTTP requests with Axios
- Creating Express routes for CRUD operations
- Connecting an Express backend to a MySQL database
- Updating the UI based on state changes
- Creating a responsive layout with Bootstrap

<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE.txt](https://github.com/NereidaRondon/mathspace/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
