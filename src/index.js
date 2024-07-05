const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

const routes = require('./routes/index.Routes');

// Use static duoc ho tro boi express
app.use(express.static(path.join(__dirname, 'public')));

// Aplly middleware de handle body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// XMLHttpRequest, fetch, axios => Dung de gui du lieu

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(port, () =>
    console.log('Example app listening at http://localhost:3000'),
);
