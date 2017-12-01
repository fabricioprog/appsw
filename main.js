/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var info_bases = new Array();
var index = 0;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    //console.log('a user connected');
    io.emit('att_bases', info_bases);

    socket.on('remove_def', function (index) {
        delete info_bases[index];
        //info_bases.splice(index, 1);
        io.emit('remove_def', index);
    });
    
    socket.on('change_def', function (def) {
        info_bases[def.base].bases[def.defesa] = !info_bases[def.base].bases[def.defesa];
        io.emit('change_def', def);
    });
    
    
    socket.on('up_def', function (msg) {
        msg.id = index++;
        msg.bases = new Array(false, false, false, false, false);
        info_bases.push(msg);
        io.emit('up_def', msg);
    });
});



http.listen(8081, function () {
    console.log('listening on *:3000');
});

