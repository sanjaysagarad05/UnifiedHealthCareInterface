import React, { useState } from 'react';
import "./record.css"

function Record({account}) {
 const [recording, setRecording] = useState(false);
 const [mediaRecorder, setMediaRecorder] = useState(null);
 const [audioChunks, setAudioChunks] = useState([]);
 const [transcript, setTranscript] = useState('');
 

 const startRecording = () => {
   navigator.mediaDevices.getUserMedia({ audio: true })
     .then(stream => {
       const recorder = new MediaRecorder(stream);
       setMediaRecorder(recorder);
       recorder.start();

       recorder.ondataavailable = e => setAudioChunks(prev => [...prev, e.data]);
       setRecording(true);
     });
 };

 const stopRecording = () => {
   mediaRecorder.stop();
   setRecording(false);
 };

 const sendAudioToServer = () => {
   const blob = new Blob(audioChunks, { type: 'audio/wav' });
   const formData = new FormData();
   formData.append('audio', blob);

   fetch('http://localhost:3005/upload', {
     method: 'POST',
     body: formData
   })
   .then(response => response.json())
   .then(data => setTranscript(data))
   .catch(error => console.error(error));
 };

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([transcript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${account}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

 return (
   <div>
    <div className="main-container-trancript">
               <div className="main-transcript">
              {transcript} 
             </div>

     <button onClick={startRecording}>Start Recording</button>
     <button onClick={stopRecording}>Stop Recording</button>
     <button onClick={sendAudioToServer} disabled={recording}>Start Transcription</button>
     <button onClick={downloadFile}>Download Transcript</button>
     </div>
     
   </div>
 );
}

export default Record;

