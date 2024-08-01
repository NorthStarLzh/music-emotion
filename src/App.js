import React from 'react';
import './App.css'; // Import CSS for styling
import Sidebar from './Sidebar.jsx';
import StartPage from './Start.jsx';
import AdjustPage from './Adjust.js'; // 
import OrderPage from './Order.js'; 
import EndPage from './End.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        {/* 此处需要专门说明 只能使用routes和element，否则会报错，这就是最新版（x */}
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/adjustPage" element={<AdjustPage />} />
          <Route path="/orderPage" element={<OrderPage />} />
          <Route path="/endPage" element={<EndPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
