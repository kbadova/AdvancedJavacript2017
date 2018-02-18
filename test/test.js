const positiveNumbers = [1, 2, 3, 4, 5];

function isEven(n) {
  return n % 2 == 0;
}

// const io = require('socket.io')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('input', function(msg) {
    const numbers = msg.split('0');

    if (numbers.indexOf('0') == -1) {
      const allNumbers = numbers[0];
      const n = allNumbers.length;
      const splittedNumbes = allNumbers.split('');

      splittedNumbes.map((num, index) => {
        var reversedIndex;

        if (isEven(n)) {
          reversedIndex = n - index;
        } else {
          reversedIndex = n - index - 1;
        }
        if (num == splittedNumbes[reversedIndex]) {
          console.log(splittedNumbes.slice(index, reversedIndex));
        }
      });
    }
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
