import react from 'react'
import {Routes, BrowserRouter, Route} from "react-router-dom"
import { Error404, Home, LoadingPage, StartPage, CardsPage} from "./pages"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={StartPage}/>
        <Route path="/loading" element={LoadingPage}/>
        <Route path="/Home" element={Home}/>
         <Route path="/Cards" element={CardsPage}/>       
        <Route path="*" element={Error404}/>


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
