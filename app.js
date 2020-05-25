const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('./db/mongoose');
const Contact = require('./db/models/contact').contact;

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, './partials'));

app.use(express.json());
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

app.post('/contact', (req, res) => {
    const contact = new Contact(req.body);

    contact.save()
    .then(() => {
        res.status(201).json({
            message: "Response registered."
        });
    }).catch((err) => {
        res.status(400).send(err.name);
    });
});

app.get('/*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log(`Server is up on Port: ${port}`);
    console.log('Press Ctrl+C to terminate');
});