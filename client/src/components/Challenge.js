import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';

const Challenge = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Fetch challenge data
    axios.get('/api/challenge').then((response) => {
      setCode(response.data.code);
    });
  }, []);

  return (
    <div>
      <h1>Challenge</h1>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
    </div>
  );
};

export default Challenge;
