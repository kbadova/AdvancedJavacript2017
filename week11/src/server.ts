import * as express from 'express';
import {Request, Response} from 'express';
import * as path from 'path';

import * as _http from 'http';
import * as _socketIo from 'socket.io';

var app = express();

var http = require('http').Server(app);
var io = _socketIo(http);

app.get('/socket.io/socket.io.js', (req: Request, res: Response) => {
  console.log(req);

  res.sendFile(path.resolve('node_modules/socket.io-client/dist/socket.io.js'));
});

app.get('/', (req: Request, res: Response) => {
  console.log(req);
  res.sendFile(path.resolve('./public/index.html'));
});

io.on('connection', function(socket) {
  console.log('a user connected');

  const id = setInterval(() => {
    const result = cpuAverage();
    socket.emit('sendData', result.total);
  }, 2000);

  socket.on('disconnect', () => {
    console.log('diconnected user');
    clearInterval(id);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

var os = require('os');

//Create function to get CPU information
function cpuAverage() {
  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0,
    totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for (var i = 0, len = cpus.length; i < len; i++) {
    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length, total: totalTick / cpus.length};
}

//Grab first CPU Measure
var startMeasure = cpuAverage();

//Set delay for second Measure
setTimeout(function() {
  //Grab second Measure
  var endMeasure = cpuAverage();

  //Calculate the difference in idle and total time between the measures
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;

  //Calculate the average percentage CPU usage
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
  console.log(percentageCPU + '% CPU Usage.');
}, 100);
