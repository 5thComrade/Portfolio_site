const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

adminSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'liveyoungwildandfree');
    if(user.tokens.length < 4) {
        user.tokens = user.tokens.concat({ token: token });
        await user.save()
        return token;
    } else {
        return 401;
    }
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;