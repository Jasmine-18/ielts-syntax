import './App.css';
import recordButtonImage from './assets/mic.png'; // Adjust the path as necessary
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Question() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'recording.wav';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Navigate to Result.js with feedback
        const feedback = "Your recording was successful!";
        navigate('/result', { state: { feedback } });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="centered-column">
          <h4>Below are the questions for this oral test.</h4>
          <p className="detail"> Please click on the button below to start the test when you are ready.</p>
          <div id="backend-content" className="content-placeholder">
            <p>Title</p>  
          </div>
          <br />
          <button className="record-button" onClick={handleRecord}>
            <img src={recordButtonImage} alt="Record" className="record-button-image" />
          </button>
          {isRecording && <p>Recording...</p>}
        </div>
      </header>
    </div>
  );
}

export default Question;