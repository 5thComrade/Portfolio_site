const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
    fs.readFile('./contacts.json', (err, data) => {
        const arr = JSON.parse(data);
        arr.push(req.body);
        fs.writeFileSync('contacts.json', JSON.stringify(arr));
    })
    res.status(200).json({
        message: 'Response registered...'
    });
})

app.get('/antony', (req, res) => {
    fs.readFile('./contacts.json', (err, data) => {
        res.json(JSON.parse(data));
    })
})

app.get('/*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log(`Server is up on Port: ${port}`);
    console.log('Press Ctrl+C to terminate');
});