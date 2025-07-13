import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route , useLocation} from 'react-router-dom'
import Nav from './pages/nav'
import Home from './pages/Home'
import Signin from './pages/signin'
import Signup from './pages/Signup'
import Buy from './pages/buy'
import Search from './pages/Search'
import Rent from './pages/rent'
import Help from './pages/Help'
import PropertyModal from './components/PropertyModal';
import Sell from './pages/Sell'
import HomeLoans from './pages/HomeLoans'
import ZillowPartners from './pages/ZillowPartners'
import Rentals from './pages/Rentals'
import AgentSearchPage from './pages/AgentSearchPage'
import ChatWidget from './components/ChatWidget';
import SellRentForm from './pages/SellRentForm'



function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


function AppContent() {
  const location = useLocation();

  const hideNav = location.pathname === "/sign-in" || location.pathname === "/sign-up";
  const hideChat = hideNav; // Hide chatbot on sign-in/up pages as well

  return (
    <>
      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/property/:id" element={<PropertyModal />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/mortgage" element={<HomeLoans />} />
        <Route path="/agent" element={<AgentSearchPage />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/advertise" element={<ZillowPartners />} />
        <Route path="/help" element={<div className='cheese'><Help /></div>} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/upload" element={< SellRentForm/>} />
      </Routes>

      {!hideChat && <ChatWidget />} 
    </>
  );
}


export default App
