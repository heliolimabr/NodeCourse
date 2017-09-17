module.exports.noticias = function(application, req, res) {
    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.getNoticias(function(erro, result){
        res.render('noticias/noticias', {
            noticias: result
        });
    });
}

module.exports.noticia = function(application, req, res) {
    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);
    
    noticiasModel.getNoticia(function(erro, result){
        res.render('noticias/noticia', {
            noticias: result
        });
    });
}