import React, { useState } from 'react';

// Child Component
function ChildComponent({ message, onButtonClick }) {
  return (
    <div style={{ border: '1px solid blue', padding: '20px', margin: '10px' }}>
      <h2>Child Component</h2>
      <p>Message from Parent: <strong>{message}</strong></p>
      <button onClick={onButtonClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Click Me
      </button>
    </div>
  );
}
// Parent Component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [parentMessage, setParentMessage] = useState('Hello from Parent!');

  const handleChildClick = () => {
    setCount(count + 1);
    setParentMessage(`Button clicked ${count + 1} times!`);
  };

  return (
    <div style={{ border: '1px solid green', padding: '20px' }}>
      <h1>Parent Component</h1>
      <p>Total Clicks: <strong>{count}</strong></p>

      {/* Passing props to Child Component */}
      <ChildComponent 
        message={parentMessage} 
        onButtonClick={handleChildClick} 
      />
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>React Parent-Child Component Example</h1>
      <ParentComponent />
    </div>
  );
}
