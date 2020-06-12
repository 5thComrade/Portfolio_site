const fs = require('fs');
const path = require('path');
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');
const hbs = require('hbs');
const Contact = require('../db/models/contact').contact;
const Admin = require('../db/models/admin');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/projects', (req, res) => {
    res.render('projects');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/login', (req, res) => {
    res.clearCookie('id');
    res.render('login');
})

router.get('/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.clearCookie('id');
        res.redirect('/login');
    } catch(err) {
        res.status(500).send('Something went wrong');
    }
})

router.get('/resume', auth, async (req, res) => {
    try {
        res.render('resume');
    } catch(err) {
        res.status(500).send('Something went wrong');
    }
})

router.post('/generateResume', auth, async (req, res) => {
    try {
        (async () => {
            let data = {
                message: req.body.message
            };
            const templateHtml = fs.readFileSync(path.join(__dirname, '../resumeTemplate', 'resume.hbs'), 'utf8');
            const template = hbs.compile(templateHtml);
            const finalHtml = template(data);
            const options = {
                format: 'A4',
                margin: {
                    top: '40px',
                    botton: '40px'
                },
                printBackground: true,
                path: 'resume.pdf'
            };

            const browser = await puppeteer.launch({
                args: ['--no-sandbox'],
                headless: true
            });
            const page = await browser.newPage();
            await page.goto(`data: text/html, ${finalHtml}`, {
                waitUntil: 'networkidle0'
            });
            await page.pdf(options);
            await browser.close();
        })().then((resolved) => res.render('resume', { message: 'The resume is generated, ready for download'}))
        .catch((err) => console.log('Something went wrong'));
    } catch(e) {
        res.status(500).send('Something went wrong');
    }
})

router.get('/downloadResume', auth, async (req, res) => {
    try {
        res.download(path.join(__dirname, '../resume.pdf'));
    } catch(e) {
        res.status(500).send('Something went wrong');
    }
})

router.get('/adminDashboard', auth, async(req, res) => {
    try {
        const users = await Contact.find({});
        res.render('adminDashboard', { users });
    } catch(err) {
        res.status(500).send('Something went wrong');
    }
    
})

router.post('/contact', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save()
        res.status(201).json({
            message: "Response registered."
        })
    } catch(err) {
        res.status(400).json({
            error: err.name
        })
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const login_errors = [];
        if(req.body.email === '' || req.body.password === '') {
            login_errors.push('Unable to login');
            return res.render('login', { login_errors });
        }
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admin.findOne({ email });
        if(!admin) {
            login_errors.push('Unable to login');
            res.render('login', { login_errors, email });
        } else {
            const isMatch = await bcrypt.compare(password, admin.password);
            if(!isMatch) {
                login_errors.push('Unable to login');
                res.render('login', { login_errors, email });
            } else {
                const token = await admin.generateAuthToken()
                // res.status(200).cookie('id', token).send({ success: true })
                if(token === 401) {
                    res.status(401).send('Maximum of 4 sessions allowed');
                } else {
                    res.cookie('id', token);
                    res.redirect('/adminDashboard');
                }
            }
        }
    } catch(err) {
        res.status(500).send('Something went wrong, could not connect to the database');
    }
})

router.get('/*', (req, res) => {
    res.render('404');
});

module.exports = router;