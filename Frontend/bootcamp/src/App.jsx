import {Routes, BrowserRouter, Route} from "react-router-dom"
import { Error404, Home, LoadingPage, StartPage, CardsPage, Room, GamePage} from "./pages"
import './App.css'
import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060E42] to-[#475BDF] bg-cover bg-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />}/>
          <Route path="/Loading" element={<LoadingPage />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Cards" element={<CardsPage />}/>       
          <Route path="*" element={<Error404 />}/>
          <Route path="/Room" element={<Room />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

    //<body className=" min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/fondoAzul.jpeg')"}}>
