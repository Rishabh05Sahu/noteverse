import React, { createContext, useState } from 'react'
const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [semester, setSemester] = useState('')
    const [subject, setSubject] = useState('')
    const [subjects,setSubjects]= useState([])


    return (
        <AppContext.Provider value={{ semester, setSemester, subject, setSubject ,subjects,setSubjects}}>
            {children}
        </AppContext.Provider>)


}


export { AppContext, AppProvider };
