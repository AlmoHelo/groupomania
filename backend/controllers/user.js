const db = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypt = require('crypto-js');
require('dotenv').config()
/*
let pass = "123456"
bcrypt.hash(pass, 10)
.then((hash) => {
    db.query(`INSERT INTO user (email, pseudo, password, creationDate) VALUES ("almoyner.heloise@gmail.com", "almohelo", "`+ hash + `", "2021-02-24")`)
})*/
//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash
            const insertUser = `INSERT INTO user (email, pseudo, password, biographie, creationDate) VALUES ("` + user.email + `", "` + user.pseudo + `", "` + user.password + `", "` + user.biographie + `", NOW() )`
            db.query(insertUser, (err, result, field) => {
                if (err) {
                    console.log(err)
                    let myMsgError = JSON.stringify(err.sqlMessage)
                    let indexDuplicateEmail = myMsgError.indexOf(`${req.body.email}`)
                    let indexDuplicatePseudo = myMsgError.indexOf(`${req.body.pseudo}`)
                    console.log(indexDuplicateEmail)
                    console.log(indexDuplicatePseudo)
                    if (indexDuplicateEmail > -1) {
                        return res.status(410).json(err.sqlMessage);
                    }
                    if (indexDuplicatePseudo > 1) {
                        return res.status(420).json(err.sqlMessage);
                    }
                    return res.status(400).json({ message: err.sqlMessage })
                }
                return res.status(201).json({ message: 'Votre compte a bien été crée !' },)
            });
        });
};


//Connexion de l'utilisateur
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let token = process.env.DB_TOKEN;

    const sqlFindUser = "SELECT userId, password, pseudo FROM user WHERE email = ?";

    db.query(sqlFindUser, [email], function (err, result) {
        console.log(result)
        if (result.length == 0) {                       //utilisateur pas dans la base de données !! 
            return res.status(500).json("erreur");
        };
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });         //mot de passe incorrect
                } else {
                    res.status(200).json({
                        token: jwt.sign(
                            { userId: result[0].userId },
                            token,
                            { expiresIn: "24h" }
                        ), userId: result[0].userId, pseudo: result[0].pseudo,
                    });
                }
            })
    });
}

// Suppression Utilisateur
exports.deleteUser = (req, res, next) => {
    const userId = JSON.parse(JSON.stringify(req.params.id))
    db.query(
        'DELETE FROM user WHERE userId= ?', userId, (error, result, field) => {
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
    const id = req.body.id
    let password = req.body.password
    const biographie = req.body.biographie
    bcrypt.hash(password, 10)
        .then((hash) => {
            password = hash
            db.query(
                `UPDATE user SET email="` + email + `", pseudo="` + pseudo + `", password="` + password + `", biographie="` + biographie + `" WHERE userId=` + id, (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        let myMsgError = JSON.stringify(error.sqlMessage)
                        let indexDuplicateEmail = myMsgError.indexOf(`${email}`)
                        let indexDuplicatePseudo = myMsgError.indexOf(`${pseudo}`)
                        console.log(indexDuplicateEmail)
                        console.log(indexDuplicatePseudo)
                        if (indexDuplicateEmail > -1) {
                            return res.status(410).json(error.sqlMessage);
                        }
                        if (indexDuplicatePseudo > 1) {
                            return res.status(420).json(error.sqlMessage);
                        }
                    }
                    return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
                }

            )

        });
};

//Affichage de l'utilisateur selectionné
exports.getOneUser = (req, res, next) => {
    const userId = JSON.parse(JSON.stringify(req.params.id))
    const oneU = 'SELECT userId, email, pseudo, biographie, creationDate FROM user WHERE userId=' + userId
    db.query(oneU, (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(results)
    })
}