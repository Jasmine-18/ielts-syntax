import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Question() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('API URL:', process.env.REACT_APP_API_URL); // 检查环境变量是否正确加载
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Questions</h1>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Question;