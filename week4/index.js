var express = require('express');
var app = express();
var https = require('https');
const fs = require('fs');

const re = /[a-z]{4,}/gi;

app.get('/work', function(req, res) {
  https.get('https://www.fmi.uni-sofia.bg/', robj => {
    robj.on('data', data => {
      debugger;
      var dstr = data.toString();
      var rres = null;

      do {
        rres = re.exec(dstr);
        if (rres) {
        }
      } while (rres);
      // data.forEach(byte => {
      //   fs.read(byte, data, 0, data.length, 0);
      //   console.log(data.toString('utf8'));
      // });
    });

    robj.on('end', x => {
      res.send('numcnts');
      //            res.end()
    });
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
