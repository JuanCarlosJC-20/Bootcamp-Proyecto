import {Routes, BrowserRouter, Route} from "react-router-dom"
import { Error404, Home, LoadingPage, StartPage, CardsPage, Room} from "./pages"
import './App.css'
import React from "react";



function App() {

  return (

    //<body className=" min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/fondoAzul.jpeg')"}}>
        <div className="min-h-screen bg-gradient-to-b from-[#060E42] to-[#475BDF] ">
        <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path="/Loading" element={<LoadingPage />}/>
        <Route path="/Home" element={<Home />}/>
         <Route path="/Cards" element={<CardsPage />}/>       
        <Route path="*" element={<Error404 />}/>
        <Route path="/Room" element={<Room />} />


      </Routes>
      </BrowserRouter>
      
    </div >
    
    
  )
}

export default App
