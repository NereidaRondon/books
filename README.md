# Lectora - Book Tracker

Developed by: **Nereida Rondon**

Repository: [https://github.com/NereidaRondon/books](https://github.com/NereidaRondon/books)

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

5. Create a `.env` file in the backend folder and add your MySQL database credentials

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

6. Start the backend server

```bash
npm start
```

7. Open a second terminal and start the frontend development server

```bash
cd client
npm run dev
```


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
