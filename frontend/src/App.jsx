import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';


//Sensors
import WaterSensor from './pages/WaterSensor';
import LoadCellWeight from './pages/LoadCellWeight';
import LoadCellEat from './pages/LoadCellEat';
import RfidScanner from './pages/RfidScanner';
import UltraSonicSensor from './pages/UltraSonicSensor';
import PhSensor from './pages/PhSensor';





function App() {

  return (
    <>
       <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<LandingPage  />} />
                <Route path="/watersensor" element={<WaterSensor  />} />
                <Route path="/loadcellweight" element={<LoadCellWeight  />} />
                <Route path="/loadcellfood" element={<LoadCellEat  />} />
                <Route path="/rfidscanner" element={<RfidScanner  />} />
                <Route path="/watersensor" element={<WaterSensor  />} />
                <Route path="/phsensor" element={<PhSensor  />} />
                <Route path="/ultrasonic" element={<UltraSonicSensor />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
