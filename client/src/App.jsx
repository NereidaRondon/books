// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Books from './pages/Books'
import Add from './pages/Add'
import Update from './pages/Update'


function App() {
 

  return (
    <>
      <section id="center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Books/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/update" element={<Update/>} />
          </Routes>
        </BrowserRouter>

      </section>

    </>
  )
}

export default App
