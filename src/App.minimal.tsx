import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MinimalIndex = () => {
  return (
    <div style={{padding: 40, fontFamily: 'system-ui, Arial', background: '#fff', color: '#000', minHeight: '100vh'}}>
      <h1>VistaForge - Fintech Template</h1>
      <p>Welcome to VistaForge! This is a minimal working version.</p>
      <div style={{marginTop: 20}}>
        <h2>Features:</h2>
        <ul>
          <li>AI-powered real estate visualization</li>
          <li>Market analysis tools</li>
          <li>Investment calculators</li>
          <li>Property search</li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  console.log('APP-ENTRY-LOG: App component mounted');
  
  // Global error handler
  window.onerror = function(msg, src, line, col, err) {
    console.error('APP-ONERROR', { msg, src, line, col, err });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MinimalIndex />} />
        <Route path="*" element={<MinimalIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
