/* importar as configs do servidor (nao precisa ter o .js) */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8080, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

/* criar a conexão por websocket */
io.on('connection', function(socket){
    console.log('usuário conectou');

    socket.on('disconnect', function(){
        console.log('usuário desconectou');
    })
});