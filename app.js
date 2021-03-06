var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var values = [
  { name: 'AAA', value: 12.0 },
  { name: 'BBB', value: 12.1 },
  { name: 'CCC', value: 11.9 }
];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/foundation.min.css', function(req, res){
  res.sendFile(__dirname + '/foundation.min.css');
});

app.get('/foundation.min.js', function(req, res){
  res.sendFile(__dirname + '/foundation.min.js');
});

app.get('/jquery.min.js', function(req, res){
  res.sendFile(__dirname + '/jquery-2.1.3.min.js');
});

io.on('connection', function(socket){
  io.emit('values', values);

  socket.on('reset', function(){
    values = [
      { name: 'AAA', value: 12.0 },
      { name: 'BBB', value: 12.1 },
      { name: 'CCC', value: 11.9 }
    ];
    socket.emit('values', values);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
  sendNewValue();
});

function sendNewValue(){
  value = updateRandomValue();
  io.emit('value', value);
  setTimeout(sendNewValue, 1000);
}

function updateRandomValue(){
  index = Math.floor(Math.random() * values.length);
  value = values[index];
  change = Math.random() < 0.5 ? 0 : (Math.random() < 0.5 ? -0.1 : 0.1);
  value.value = Math.floor((value.value + change)*10)/10;
  return value;
}
