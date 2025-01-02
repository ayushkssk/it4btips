import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarketTicker from './components/MarketTicker'
import ServicesSection from './components/ServicesSection'
import Features from './components/Features'
import TestimonialsSection from './components/TestimonialsSection'
import ContactForm from './components/ContactForm'
import Messages from './components/Messages'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app" data-theme="it4b">
        <Navbar />
        <MarketTicker />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <TestimonialsSection />
              <Features />
              <ServicesSection />
            </>
          } />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
