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

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('values', values);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  updateValues();
});

function updateValues(){
  io.emit('values', values);
  setTimeout(updateValues, 1000);
}