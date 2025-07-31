import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Leaderboard from "./Pages/Leaderboard";
import { ConnectButton } from "@rainbow-me/rainbowkit";


function App() {
  return (
    <div className="min-h-screen font-pixel text-greenlite">
      {/* Background image & overlay */}
      <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="bg-black/70 backdrop-blur-sm min-h-screen w-full flex flex-col">
          
          {/* Navbar */}
        <nav className="w-full border-b border-greenlite flex items-center justify-between px-6 py-4">
            <div className="text-4xl font-bold">AbstraCats</div>
            <div className="flex space-x-8 text-2xl">
             <Link to="/" className="hover:underline">Home</Link>
             <Link to="/gallery" className="hover:underline">Gallery</Link>
             <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
            </div>
            <div className="font-pixel text-greenlite text-xl">
              <ConnectButton />
            </div>

       </nav>


          {/* Routes */}
          <main className="flex-1 flex justify-center items-center p-8">
            <div className="w-full max-w-4xl text-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
