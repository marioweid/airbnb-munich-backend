const express = require('express');
const csv = require('csv-parser');
const {createReadStream, existsSync} = require('fs');
const router = express.Router();

const {test, allFiles} = require('./fileService');

router.get('/', (req, res) => {
  res.send('root page');
});

router.get('/about', (req, res) => {
  res.send('about page');
});

router.get('/files', (req, res) => {
  res.send(allFiles('./../dataset/'))
});


router.get('/files/:filename', (req, res) => {
  let filename = req.params.filename;
  console.log(filename);

  let results = [];
  let requestedFile = `./../dataset/${filename}`;
  if (existsSync(requestedFile)) {
    createReadStream(requestedFile)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => res.status(200).send(results))
  } else {
    res.status(404).send(`File '${req.params.name}' not found`);
  }


});

module.exports = router;
