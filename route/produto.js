module.exports = (app) => {
    app.post(
        '/produto',
        app.controller.produto.cadastrar
    );
    app.put(
        '/produto',
        app.controller.produto.alterar,
    );

    app.get(
        '/produto/:codigo',
        app.controller.produto.buscarcodigo,
    )
    
}