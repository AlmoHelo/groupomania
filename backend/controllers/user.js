const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const crypt = require('crypto-js');
require('dotenv').config()

//requête inscription
exports.signup = (req, res, next) => {
    const email = sanitize(req.body.email);         //nettoie les entrées 
    const pseudo = sanitize(req.body.pseudo);
    const mot_de_passe = sanitize(req.body.mot_de_passe);
    const cryptoEmail = crypt.MD5(email).toString();
    const cryptoPseudo = crypt.MD5(pseudo).toString();

    bcrypt.hash(mot_de_passe, 10)
        .then(hash => {
            const user = new User({
                email: cryptoEmail,
                pseudo: cryptoPseudo,
                mot_de_passe: hash                      //hashage du mot de passe   
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//requête identification
exports.login = (req, res, next) => {
    const email = sanitize(req.body.email);
    const mot_de_passe = sanitize(req.body.mot_de_passe);
    const cryptoEmail = crypt.MD5(email).toString();

    User.findOne({ email: cryptoEmail } || { pseudo: cryptoPseudo })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(mot_de_passe, user.mot_de_passe)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.DB_TOKEN,      //chaîne aléatoire pour encoder token
                            { expiresIn: '2h' }         //durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};