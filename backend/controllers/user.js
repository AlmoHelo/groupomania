const db = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    if (req.file == undefined) {                        //si l'utilisateur n'a pas choisi d'image de profil, on lui en attribue une par défaut
        const imageURL = `${req.protocol}://${req.get('host')}/images/pictureDefault.jpg`
        bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash
                const insertUser = `INSERT INTO user (email, pseudo, password, biographie, creationDate, pictureProfil) VALUES ("${user.email}", "${user.pseudo}", "${user.password}", "${user.biographie}", NOW(), "${imageURL}" )`
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
    } else {                       //si l'utilisateur a choisi une photo de profil
        const imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash
                const insertUser = `INSERT INTO user (email, pseudo, password, biographie, creationDate, pictureProfil) VALUES ("${user.email}", "${user.pseudo}", "${user.password}", "${user.biographie}", NOW(), "${imageURL}" )`
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
    }
};

//Connexion de l'utilisateur
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let token = process.env.DB_TOKEN;

    if (email.includes("@") == true) {          //if user uses email
        db.query(`SELECT userId, email, password, pseudo, isAdmin FROM user WHERE email="${email}"`, function (err, result) {
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
                            ), userId: result[0].userId, pseudo: result[0].pseudo, admin: result[0].isAdmin, email: result[0].email
                        });
                    }
                })
        });
    } else {                    //if user uses pseudo
        db.query(`SELECT userId, password, email, pseudo, isAdmin FROM user WHERE pseudo="${email}"`, function (err, result) {
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
                            ), userId: result[0].userId, pseudo: result[0].pseudo, admin: result[0].isAdmin, email: result[0].email
                        });
                    }
                })
        });
    }

}

let deleteItemLike = (userId) => {
    db.query(`DELETE FROM userLikes WHERE userIdLike=${userId}`, (err, resp, fields) => {
        if (err) {
            console.log(err)
        } else {
            console.log("supprimé des likes")
        }
    })
}
let deleteItemDislike = (userId) => {
    db.query(`DELETE FROM userDislikes WHERE userIdDislike=${userId}`, (err, resp, fields) => {
        if (err) {
            console.log(err)
        } else {
            console.log("supprimé des dislikes")
        }
    })
}
// Suppression Utilisateur
exports.deleteUser = (req, res, next) => {
    const userId = req.params.id
    db.query(
        `DELETE FROM user WHERE userId=${userId}`, (error, result, field) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error)
            }
            db.query(`SELECT * FROM item WHERE userItemId=${userId}`, (err, resp, fields) => {
                if (resp.length > 0) {
                    db.query(`DELETE FROM item WHERE userItemId=${userId}`, (err, result, fields) => {
                        if (err) {
                            console.log(err)
                        } else {
                            db.query(`SELECT * FROM comment WHERE userCommId=?`, userId, (err, resp, fields) => {
                                if (resp.length > 0) {
                                    db.query(`DELETE FROM comment WHERE userCommId=?`, userId, (err, res_, fields) => {
                                        if (err) {
                                            return resp.status(400).json(error)
                                        } else {
                                            db.query(`SELECT * FROM userLikes WHERE userIdLike=${userId}`, (err, response, fields) => {
                                                console.log(response.length)
                                                if (response.length > 0) {
                                                    const deleteLike = deleteItemLike(userId)
                                                } else {
                                                    const deleteDislike = deleteItemDislike(userId)
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    db.query(`SELECT * FROM userLikes WHERE userIdLike=${userId}`, (err, response, fields) => {
                                        if (response.length > 0) {
                                            const deleteLike = deleteItemLike(userId)
                                        } else {
                                            const deleteDislike = deleteItemDislike(userId)
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    return res.status(200).json({ message: 'Votre compte a bien été supprimé !' })
                }
            })
            return res.status(200).json({ message: 'Votre compte a bien été supprimé !' })
        }
    )
}

//Modification des infotmations utilisateurs
exports.updateUser = (req, res, next) => {
    const email = req.body.email
    const pseudo = req.body.pseudo
    const id = req.params.id
    let password = req.body.password
    const biographie = req.body.biographie

    if (req.file == undefined) {
        db.query(`SELECT pictureProfil FROM user WHERE userId=${id}`, (err, resp, fields) => {
            const imageURL = JSON.stringify(resp).split('"')[3];
            bcrypt.hash(password, 10)
                .then((hash) => {
                    password = hash
                    db.query(
                        `UPDATE user SET email="${email}", pseudo="${pseudo}", password="${password}", biographie="${biographie}", pictureProfil="${imageURL}" WHERE userId=${id}`, (error, results, fields) => {
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
                            db.query(`UPDATE item SET pseudoUser="${pseudo}" WHERE userItemId=${id}`), (err, res) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("Données modif")
                                }
                            }
                            return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
                        }
                    )
                });
        })
    } else {
        const imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        bcrypt.hash(password, 10)
            .then((hash) => {
                password = hash
                db.query(
                    `UPDATE user SET email="${email}", pseudo="${pseudo}", password="${password}", biographie="${biographie}", pictureProfil="${imageURL}" WHERE userId=${id}`, (error, results, fields) => {
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
                        db.query(`UPDATE item SET pseudoUser="${pseudo}" WHERE userItemId=${id}`), (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Données modif")
                            }
                        }
                        return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
                    }

                )

            });
    }
};

//Affichage de l'utilisateur connecté
exports.getOneUser = (req, res, next) => {
    const userId = req.params.id
    const oneU = `SELECT userId, email, pseudo, biographie, creationDate, pictureProfil FROM user WHERE userId=${userId}`
    db.query(oneU, (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(results)
    })
}

//Compter le nombre d'utilisateur 
exports.getCountUsers = (req, res, next) => {
    db.query(`SELECT COUNT(userId) FROM user`, (err, result) => {
        if (err) {
            return res.status(400).json(error)
        }
        let re = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
        return res.status(200).json(re)
    })
}

//Affichage de l'utilisateur selectionné
exports.getOneOtherUser = (req, res, next) => {
    const pseudo = req.params.id
    db.query(`SELECT userId, email, pseudo, biographie, creationDate, pictureProfil FROM user WHERE pseudo="${pseudo}"`, (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(results[0])
    })
}