const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Deepgram } = require('@deepgram/sdk');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001'
   }));

const deepgram = new Deepgram('665576cb6375b46863b87792ac563c201951e21d');

app.post('/upload', upload.single('audio'), (req, res) => {
 const audio = fs.readFileSync(req.file.path);

 deepgram.transcription
  .preRecorded({ buffer: audio, mimetype: 'audio/wav' }, { smart_format: true, model: 'nova' })
  .then(response => {
    res.json(response.results.channels[0].alternatives[0].transcript);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

app.listen(3005, () => console.log('Server started on port 3005'));
