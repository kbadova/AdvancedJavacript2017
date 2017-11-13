var express = require('express');
var app = express();
var https = require('https');
const fs = require('fs');

const fourLettersRE = /\s[a-z]{4}\s/gi;
const fiveLettersRE = /\s[a-z]{5}\s/gi;
const sixLettersRE = /\s[a-z]{6}\s/gi;



app.get('/work', function (req, res) {
  https.get('https://www.fmi.uni-sofia.bg/', robj => {
    var result = {
      'wordsWithFourLetters': 0,
      'wordsWithFiveLetters': 0,
      'wordsWithSixLetters': 0,
    }

    robj.on('data', data => {
      var stringifiedData = data.toString();
      var wordsWithFourLetters = null;
      var wordsWithFiveLetters = null;
      var wordsWithSixLetters = null;
      
      do {
        wordsWithFourLetters = fourLettersRE.exec(stringifiedData)
        wordsWithFiveLetters = fiveLettersRE.exec(stringifiedData)
        wordsWithSixLetters = sixLettersRE.exec(stringifiedData)

        wordsWithFourLetters ? result['wordsWithFourLetters'] += wordsWithFourLetters.length : null
        wordsWithFiveLetters ? result['wordsWithFiveLetters'] += wordsWithFiveLetters.length : null
        wordsWithSixLetters ? result['wordsWithSixLetters'] += wordsWithSixLetters.length : null
      } while (wordsWithFourLetters || wordsWithFiveLetters || wordsWithSixLetters);

    });

    robj.on('end', x => {
      res.send(result);
      //            res.end()
    });
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
