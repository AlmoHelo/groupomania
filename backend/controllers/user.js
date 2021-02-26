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
            const insertUser = `INSERT INTO user (email, pseudo, password, biographie, creationDate) VALUES ("` + user.email + `", "` + user.pseudo +`", "` + user.password +`", "` + user.biographie + `", NOW() )`
            db.query(insertUser, (err, result, field) => {
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
    const email = req.body.email;
    const password = req.body.password;
    let token = process.env.DB_TOKEN;

    const sqlFindUser = "SELECT userId, password FROM user WHERE email = ?";

    db.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                } else {
                    res.status(200).json({
                        token: jwt.sign(
                            { userId: result[0].userId },
                            token,
                            { expiresIn: "24h" }
                        ), userId: result[0].userId
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
    const userId = JSON.parse(JSON.stringify(req.params.id))
    const oneU = 'SELECT userId, email, pseudo, biographie, creationDate FROM user WHERE userId=' + userId 
    db.query(oneU, (error, results) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json(results)
        }
    )

}