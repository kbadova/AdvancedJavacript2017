"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var _socketIo = require("socket.io");
var app = express();
var http = require('http').Server(app);
var io = _socketIo(http);
app.get('/socket.io/socket.io.js', function (req, res) {
    console.log(req);
    res.sendFile(path.resolve('node_modules/socket.io-client/dist/socket.io.js'));
});
app.get('/', function (req, res) {
    console.log(req);
    res.sendFile(path.resolve('./public/index.html'));
});
io.on('connection', function (socket) {
    console.log('a user connected');
    var id = setInterval(function () {
        var result = cpuAverage();
        socket.emit('sendData', result.total);
    }, 2000);
    socket.on('disconnect', function () {
        console.log('diconnected user');
        clearInterval(id);
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
var os = require('os');
function cpuAverage() {
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    for (var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        for (var type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}
var startMeasure = cpuAverage();
setTimeout(function () {
    var endMeasure = cpuAverage();
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
    console.log(percentageCPU + '% CPU Usage.');
}, 100);
//# sourceMappingURL=server.js.map