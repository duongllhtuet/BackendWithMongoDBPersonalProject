const newsRouter = require('./news.Route');
const siteRouter = require('./site.Route');
const courseRouter = require('./course.Route');

function routes(app) {
    app.use('/news', newsRouter);

    app.use('/courses', courseRouter)

    app.use('/', siteRouter);
}

module.exports = routes;
