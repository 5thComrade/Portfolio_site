const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cookieparser = require('cookie-parser');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, './partials'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(cookieparser());


app.use('/', require('./routes/allRoutes'));
app.use(require('./middleware/auth'));

app.listen(port, () => {
    console.log(`Server is up on Port: ${port}`);
    console.log('Press Ctrl+C to terminate');
});