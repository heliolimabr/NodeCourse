module.exports.formulario_inclusao_noticia = function(application, req, res){
    res.render('admin/form_add_noticia', {errosValidacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(application, req, res){
    var noticia = req.body;
    
    req.assert('titulo','Titulo obrigatório').notEmpty();
    req.assert('resumo','Resumo obrigatório').notEmpty();
    req.assert('resumo','Resumo deve ter entre 10 e 100').len(10,100);
    req.assert('autor','Autor obrigatório').notEmpty();
    req.assert('data_noticia','Data obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia','Noticia obrigatório').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('admin/form_add_noticia', {errosValidacao: erros, noticia:noticia});
        return;
    }

    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function(erro, result){
        res.redirect('/noticias');
    });
}