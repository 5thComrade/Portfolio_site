const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://antony:ant123456@abl-3aejj.mongodb.net/website-contacts', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});