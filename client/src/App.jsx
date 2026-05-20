import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Books from './pages/Books'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Login from './pages/Login'
import Register from './pages/Register'
import logo from './assets/lectora.svg'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
 

  return (
    <>
    <div className="container-fluid">
      <h1 className="app-title twinkle-star-regular visually-hidden">Lectora</h1>
      <h2 className="inclusive-sans-bold app-subtitle visually-hidden">Book Tracker</h2>

    <img src={logo} className="app-logo" alt="" />

      <section id="center">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }/>
            
            <Route path="/add" element={ 
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>} />

            <Route path="/edit/:id" element={
               <ProtectedRoute>
                <Edit />
              </ProtectedRoute>} />

          </Routes>
        </BrowserRouter>

      </section>
      </div>        
    </>
  )
}

export default App
