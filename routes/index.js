var express = require('express');
var router = express.Router();
const papa = require("papaparse");
const request = require("request");

const options = {/* options */};

const dataStream = request.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vR0U6WHiJr9lbledskqDdEJ-TULRXFtxYNFHEOHi82mbeQcXi-MT6YwnXKlWtf4qfKOxECKSpslI3DU/pub?gid=1890576547&single=true&output=csv");
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

dataStream.pipe(parseStream);

let data = [];
parseStream.on("data", chunk => {
    data.push(chunk);
});

parseStream.on("finish", () => {
    console.log(data);
    console.log(data.length);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
