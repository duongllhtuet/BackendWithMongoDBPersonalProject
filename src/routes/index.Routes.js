const newsRouter = require('./news.Route');
const siteRouter = require('./site.Route');

function routes(app) {
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = routes;
