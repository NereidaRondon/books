import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Books from './pages/Books'
import Add from './pages/Add'
import Edit from './pages/Edit'


function App() {
 

  return (
    <>
      <section id="center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Books/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/edit/:id" element={<Edit/>} />
          </Routes>
        </BrowserRouter>

      </section>

    </>
  )
}

export default App
