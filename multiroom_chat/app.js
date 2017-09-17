/* importar as configs do servidor (nao precisa ter o .js) */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(8080, function(){
    console.log('Servidor online');
});