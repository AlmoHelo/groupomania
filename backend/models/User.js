const mongoose = require('mongoose');

const mongooseuniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pseudo: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
    biographie: { type: String },
    date_creation: { type: Date, required: true }
});

userSchema.plugin(mongooseuniqueValidator);

module.exports = mongoose.model('User', userSchema);