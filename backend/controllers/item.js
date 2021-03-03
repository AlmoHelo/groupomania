const db = require('../database')

require('dotenv').config()

//Affichage un item
exports.getOne = (req, res, next) => {
    const userId = JSON.parse(JSON.stringify(req.params.id))
    db.query('SELECT * FROM item WHERE userItemId= ?', userId, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Affichage de tous les items dans ordre descendant
exports.getAll = (req, res, next) => {
    db.query('SELECT * FROM item ORDER BY date DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Affichage de tous les items dans ordre descendant
/*exports.getItemTop = (req, res, next) => {
    db.query('SELECT * FROM item ORDER BY likes DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}*/

//Créer un item
exports.create = (req, res, next) => {
    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const description = req.body.description;
    const pseudoUser = req.body.pseudoUser
    //const imageURL
    db.query(`SELECT userId FROM user INNER JOIN item ON pseudo = pseudoUser WHERE pseudo= "` + pseudoUser + `"`, (err, response, fields) => {
        if (err) {
            console.log(err)
        } else {
            const userItemId = JSON.parse(JSON.stringify(response));
            const sqlItemPost = "INSERT INTO item (date, description, likes, dislikes, pseudoUser, userItemId) VALUES ( ?, ?, 0, 0, ?, ?)"
            const postItem = db.format(sqlItemPost, [currentDate, description, pseudoUser, userItemId[0].userId])
            db.query(postItem, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json("erreur")
                }
                return res.status(201).json('Votre message a été posté !')
            })
        }
    })
}

//Modifier un message 
exports.update = (req, res, next) => {
    const description = req.body.description
    const id = req.body.id
    console.log(description)
    console.log(id)
    db.query(
        `UPDATE item SET description='${description}' date=NOW() WHERE id=${id}`, (error, results, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre message a bien été modifié !' })
        }
    )
}

//Delete one item
exports.delete = (req, res, next) => {
    db.query(
        'DELETE FROM item WHERE id= ?', req.body.id, (error, results, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
        }
    )
}


exports.like = (req, res, next) => {
    const like = req.body.like;
    const userId = req.params.id;
    const userEmail = JSON.stringify(req.body.email);
    const itemId = req.body.idItem;
    const id = req.params.id;

    const userIdLikeFunction = (element) => {
        return element.userIdLike == parseInt(userId)
    };
    const itemIdLikeFunction = (element) => {
        return element.idItemLike === itemId
    };
    const userIdDislikeFunction = (element) => {
        return element.userIdDislike == parseInt(userId)
    };
    const itemIdDislikeFunction = (element) => {
        return element.idItemDislike === itemId
    };

    switch (like) {
        case 1: //if user likes the item
            db.query('SELECT * FROM userLikes WHERE userIdLike=?', userId, (err, res, field) => {  //on vérif si user pas dans le tableau userLikes
                if (res.findIndex(userIdLikeFunction) == -1) {                     //si pas dans le tableau on le rajoute
                    db.query(`INSERT INTO userLikes (userIdLike, userEmailLike, idItemLike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, res, field) => {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur ajouté au tableau like !' })
                        }
                    })
                } else if (res.findIndex(userIdLikeFunction) == 0) {                // si dans le tableau 
                    db.query('SELECT * FROM userLikes WHERE idItemLike=?', itemId, (err, response, field) => {       //on vérifie que l'utilisateur n'a pas liké cet item 
                        if (response.findIndex(itemIdLikeFunction) == -1) {
                            db.query(`INSERT INTO userLikes (userIdLike, userEmailLike, idItemLike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, res, field) => {  //si non, on l'ajoute
                                if (err) {
                                    console.log("Utilisateur a déjà liker cette sauce")
                                } else {
                                    console.log({ message: "Utilisateur ajouté au tableau like" })
                                }
                            })
                        } else {
                            console.log({ message: "Article déjà liker !" })
                        }
                    })
                }
            })
            break;
        case -1: //if user dislikes the item 
            db.query('SELECT * FROM userDislikes WHERE userIdDislike=?', userId, (err, res, field) => {  //on vérif si user pas dans le tableau userDislikes
                if (res.findIndex(userIdDislikeFunction) == -1) {                     //si pas dans le tableau on le rajoute
                    db.query(`INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, res, field) => {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                        }
                    })
                } else if (res.findIndex(userIdDislikeFunction) == 0) {                // si dans le tableau 
                    db.query('SELECT * FROM userDislikes WHERE idItemDislike=?', itemId, (err, response, field) => {       //on vérifie que l'utilisateur n'a pas disliké cet item 
                        if (response.findIndex(itemIdDislikeFunction) == -1) {
                            db.query(`INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, res, field) => {  //si non, on l'ajoute
                                if (err) {
                                    console.log("Utilisateur a déjà disliké cette sauce")
                                } else {
                                    console.log({ message: "Utilisateur ajouté au tableau dislike" })
                                }
                            })
                        } else {
                            console.log({ message: "Article déjà disliké !" })
                        }
                    })
                }
            })
            break;

        case 0:
            db.query('SELECT * FROM userLikes WHERE userIdLike=?', userId, (err, res, field) => {
                if (res.findIndex(userIdLikeFunction) == 0) {
                    db.query('DELETE FROM userLikes WHERE userIdLike=?', userId, (err, res, field) => {
                        if (err) {
                            return res.status(400).json(error)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur supprimé au tableau like !' })
                        }
                    })
                }
            })
            db.query('SELECT * FROM userDislikes WHERE userIdDislikes=?', userId, (err, res, field) => {
                if (res.findIndex(userIdDislikeFunction) == 0) {
                    db.query('DELETE FROM userDislikes WHERE userIdDislikes=?', userId, (err, res, field) => {
                        if (err) {
                            return res.status(400).json(error)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur supprimé au tableau dislike !' })
                        }
                    })
                }
            })
            break;
    }
}

/*exports.like = (req, res, next) => {
    const likeSauce = req.body.like;
    const userId = JSON.parse(JSON.stringify(req.params.id));
    const userEmail = JSON.parse(JSON.stringify(req.params.email));
    const itemId = JSON.parse(JSON.stringify(req.params.idItem));
    console.log("mon id est : " + userId)
    const id = req.params.id;

    db.query('SELECT * FROM userLikes WHERE userIdLike=?', userId, (error, result, field) => {
        if (error) {
            db.query('SELECT * FROM userDislikes WHERE userIdDislike=?', userId, (err, res, field) => {
                if (err) {
                    db.query('INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (' + userId + ', ' + userEmail + ', ' + itemId + ')', (err, res, field) => {
                        if (err) {
                            return res.status(400).json(error)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                        }
                    })
                } else {
                    db.query('SELECT * FROM userDislikes WHERE idItemDislike=?', itemId, (err, res, field) => {
                        if (err) {
                            db.query('DELETE FROM userDislikes WHERE userIdDislike=?', userId, (err, res, field) => {
                                if (err) {
                                    return res.status(400).json(error)
                                } else {
                                    return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                                }
                            })
                        } else {
                            db.query('INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (' + userId + ', ' + userEmail + ', ' + itemId + ')', (err, res, field) => {
                                if (err) {
                                    return res.status(400).json(error)
                                } else {
                                    return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            db.query('SELECT * FROM userLikes WHERE idItemLike=?', itemId, (err, res, field) => {
                if (err) {
                    db.query('DELETE FROM userLikes WHERE userIdLike=?', userId, (err, res, field) => {
                        if (err) {
                            return res.status(400).json(error)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                        }
                    })
                } else {
                    db.query('INSERT INTO userLikes (userIdLike, userEmailLike, idItemLike) VALUES (' + userId + ', ' + userEmail + ', ' + itemId + ')', (err, res, field) => {
                        if (err) {
                            return res.status(400).json(error)
                        } else {
                            return res.status(200).json({ message: 'Utilisateur ajouté au tableau dislike !' })
                        }
                    })
                }
            })
        }
    })
};*/