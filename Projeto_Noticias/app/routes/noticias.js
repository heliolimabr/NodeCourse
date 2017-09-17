module.exports = function(application){
    application.get('/noticias', function(req, res){
        application.app.controllers.noticias.noticias(application, req, res);
        //res.render('noticias/noticias');
    });

    application.get('/noticia', function(req, res){
        
        application.app.controllers.noticias.noticia(application, req, res);
    });
}