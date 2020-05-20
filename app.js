const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, './partials'));

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log(`Server is up on Port: ${port}`);
    console.log('Press Ctrl+C to terminate');
});