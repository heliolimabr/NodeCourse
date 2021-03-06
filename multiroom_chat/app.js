/* importar as configs do servidor (nao precisa ter o .js) */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8080, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

//criando uma variavel global: será acessada atraves da variavel da aplicacao, ex: application.get('io')
app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function(socket){
    console.log('usuário conectou');

    socket.on('disconnect', function(){
        console.log('usuário desconectou');
    })

    socket.on('msgParaServidor', function(data){
        /* dialogo */
        socket.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem}
        );
        socket.broadcast.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem}
        );

        /* participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente', 
                { apelido: data.apelido}
            );
            socket.broadcast.emit(
                'participantesParaCliente', 
                { apelido: data.apelido}
            );
        }
    })
});