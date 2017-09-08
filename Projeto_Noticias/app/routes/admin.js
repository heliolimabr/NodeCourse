module.exports = function(app){
    app.get('/formulario_inclusao_noticia', function(req, res){
        res.render('admin/form_add_noticia');
    });

    app.post('/noticias/salvar', function(req, res){
        var noticia = req.body;
        
        req.assert('titulo','Titulo obrigatório').notEmpty();
        req.assert('resumo','Resumo obrigatório').notEmpty();
        req.assert('resumo','Resumo deve ter entre 10 e 100').len(10,100);
        req.assert('autor','Autor obrigatório').notEmpty();
        req.assert('data_noticia','Data obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
        req.assert('noticia','Noticia obrigatório').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render('admin/form_add_noticia', {errosValidacao: erros});
            return;
        }

        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function(erro, result){
            res.redirect('/noticias');
        });
    });
}