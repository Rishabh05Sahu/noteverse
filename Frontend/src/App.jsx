import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Note from './Pages/Note';
import Home from './Pages/Home';
import Pyq from './Pages/Pyq';

import { AppProvider } from "./Context/AppContext";

function App() {


  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/note' element={<Note />} />
            <Route path='/pyq' element={<Pyq />} />
        

          </Routes>


        </BrowserRouter>
      </AppProvider>
    </>
  )
}

export default App
