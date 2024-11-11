import React from 'react'
import "./Admin.css"
import Sidebar from '../../Component/Sidebar/Sidebar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNote from '../../Component/AddNote/AddNote'
import ListNote from '../../Component/ListNote/ListNote'
const Admin = () => {
  return (
    <div className='admin'>
      <BrowserRouter>
    <Sidebar/>
    
    <Routes>
        <Route path='/addnote' element={<AddNote/>}/>
        <Route path='/listnote' element={<ListNote/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Admin
