var express = require('express');
var app = express();
var https = require('https');
var bodyParser = require('body-parser');
var parser = require('rss-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

parseData = url => {
    return new Promise((resolve, reject) => {
        parser.parseURL(url, function(err, parsed) {
            if (err) {
                reject(new Error(err));
                return;
            }
            var parsedData = '';
            parsed.feed.entries.forEach(function(entry) {
                if (entry.title) {
                    parsedData =
                        parsedData + entry.title + ':' + entry.link + '\n';
                }
            });
            resolve(parsedData);
            return;
        });
    });
};

app.post('/', function(req, res) {
    parseData(req.body.url).then(data => res.send(data));
});

app.listen(3000, () => console.log('Example app listening on port 3000'));
