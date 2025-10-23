import React from 'react';

const TestApp = () => {
  console.log('TEST-APP: Component rendering');
  
  return (
    <div style={{padding: 40, fontFamily: 'system-ui, Arial', background: '#fff', color: '#000', minHeight: '100vh'}}>
      <h1>Test App - VistaForge</h1>
      <p>If you see this, React is working correctly.</p>
      <p>This is a test to verify the app renders.</p>
    </div>
  );
};

export default TestApp;
