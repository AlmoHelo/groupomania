const db = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypt = require('crypto-js');
require('dotenv').config()


//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.email = crypt.MD5(email).toString();
            user.pseudo = crypt.MD5(pseudo).toString();
            user.password = hash
            db.query(`INSERT INTO user VALUES ?`, user, (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json("erreur")
                }
                return res.status(201).json({ message: 'Votre compte a bien été crée !' },)
            });
        });
};


//Connexion de l'utilisateur
exports.login = (req, res, next) => {
    const email = req.body.email
    const pseudo = req.body.pseudo
    const password = req.body.password
    if (email && password) {                                                                            //avec l'adresse mail
        db.query('SELECT * FROM user WHERE email= ?', email, (error, results, _fields) => {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password)
                .then((valid) => {
                    if (!valid) {
                        res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
                    } else {
                        console.log(email, "s'est connecté")
                        res.status(200).json({
                            userId: results[0].id,
                            email: results[0].email,
                            token: jwt.sign(
                                { userId: results[0].id },
                                process.env.TOKEN,
                                { expiresIn: '24h' }
                            )
                        })
                    }
                })
            }
            else {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
            }
        })
        if (pseudo && password) {                                                                            //avec le pseudo
            db.query('SELECT * FROM user WHERE pseudo= ?', pseudo, (error, results, _fields) => {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password).then((valid) => {
                        if (!valid) {
                            res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
                        } else {
                            console.log(pseudo, "s'est connecté")
                            res.status(200).json({
                                userId: results[0].id,
                                pseudo: results[0].pseudo,
                                token: jwt.sign(
                                    { userId: results[0].id },
                                    process.env.TOKEN,
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                }
                else {
                    res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
                }
            }
            )
        }
    }
    else {
        res.status(500).json({ message: "Entrez votre email et votre mot de passe" })
    }
}

// Suppression Utilisateur
exports.deleteUser = (req, res, next) => {
    db.query(
        'DELETE FROM user WHERE id= ?', req.body.userId, (error, result, field) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error)
            }
            console.log('Le compte a bien été supprimé !')
            return res.status(200).json({ message: 'Votre compte a bien été supprimé !' })
        }
    )
}

//Modification des infotmations utilisateurs
exports.updateUser = (req, res, next) => {
    const email = req.body.email
    const pseudo = req.body.pseudo
    const id = req.params.id
    const password = req.body.password
    const biographie = req.body.biographie
    bcrypt.hash(passwords, 10)
        .then((hash) => {
            password = hash
            db.query(
                `UPDATE user SET email='${email}', pseudo='${pseudo}', password='${password}', biographie=${biographie}  WHERE id=${id}`, (error, results, fields) => {
                    if (error) {
                        return res.status(400).json(error)
                    }
                    return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
                }

            )

        });
};

//Affichage de l'utilisateur selectionné
exports.getOneUser = (req, res, next) => {
    const id = req.params.id
    db.query(
        'SELECT id, email, pseudo, biographie, creationDate FROM user WHERE id=?', id, (error, results) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json(results)
        }
    )

}