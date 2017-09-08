module.exports = function(app){
    app.get('/noticia', function(req, res){
        
        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);
        
        noticiasModel.getNoticia(function(erro, result){
            res.render('noticias/noticia', {
                noticias: result
            });
        });
        //res.render('noticias/noticias');
    });
}