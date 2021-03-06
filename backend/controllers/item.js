const db = require('../database')

require('dotenv').config()

//Affichage un item
exports.getOne = (req, res, next) => {
    const itemId = req.params.id
    db.query('SELECT * FROM item WHERE id= ?', itemId, (error, result, field) => {
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

//Créer un item
exports.create = (req, res, next) => {
    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const description = req.body.description;
    const pseudoUser = req.body.pseudoUser
    //const imageURL
    db.query(`SELECT userId FROM user WHERE pseudo="${pseudoUser}"`, (err, response, fields) => {
        if (err) {
            console.log(err)
        } else {
            const userItemId = JSON.stringify(response[0].userId);
            const sqlItemPost = "INSERT INTO item (date, description, likes, dislikes, pseudoUser, userItemId) VALUES ( ?, ?, 0, 0, ?, ?)"
            const postItem = db.format(sqlItemPost, [currentDate, description, pseudoUser, userItemId])
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
exports.update = (req, result, next) => {
    const description = req.body.description
    const id = req.params.id
    db.query(
        `UPDATE item SET description="${description}", date=NOW() WHERE id=${id}`, (error, res) => {
            if (error) {
                console.log(error)
                return result.status(400).json(error)
            } else {
                result.status(200).json({ message: "Item modifié" })
            }
        }
    )
}

//Delete one item
exports.delete = (req, res, next) => {
    db.query(
        'DELETE FROM item WHERE id= ?', req.params.id, (error, res, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
        }
    )
}


exports.like = (req, res, next) => {
    const like = req.body.like;
    const dislike = req.body.dislike;
    const userId = req.body.userId;
    const userEmail = JSON.stringify(req.body.email);
    const itemId = req.body.idItem;


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
                    db.query(`INSERT INTO userLikes (userIdLike, userEmailLike, idItemLike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, response, field) => {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            res.status(200).json({ message: 'Utilisateur ajouté au tableau like !' });
                        }
                    })
                } else if (res.findIndex(userIdLikeFunction) != -1) {                // si dans le tableau 
                    db.query('SELECT * FROM userLikes WHERE idItemLike=?', itemId, (err, response, field) => {       //on vérifie que l'utilisateur n'a pas liké cet item 
                        if (response.findIndex(itemIdLikeFunction) == -1) {
                            db.query(`INSERT INTO userLikes (userIdLike, userEmailLike, idItemLike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, response, field) => {  //si non, on l'ajoute               
                                if (err) {
                                    console.log("Utilisateur a déjà liker cet item")
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
            db.query("SELECT COUNT(idItemLike) FROM userLikes WHERE idItemLike=" + itemId , (err, result, fields) => {
                if(err){
                    console.log(err)
                }else{
                    let res = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                    db.query(`UPDATE item SET likes=${res} WHERE id=${itemId}`, (err, res, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log("modification enregistrée !")
                        }
                    })
                }
            })
            break;

        case -1: //if user dislikes the item 
            db.query('SELECT * FROM userDislikes WHERE userIdDislike=?', userId, (err, res, field) => {  //on vérif si user pas dans le tableau userDislikes
                if (res.findIndex(userIdDislikeFunction) == -1) {                     //si pas dans le tableau on le rajoute
                    db.query(`INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, response, field) => {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            res.status(200).json(
                                { message: 'Utilisateur ajouté au tableau dislike !' },
                            )
                        }
                    })
                } else if (res.findIndex(userIdDislikeFunction) != -1) {                // si dans le tableau 
                    db.query('SELECT * FROM userDislikes WHERE idItemDislike=?', itemId, (err, response, field) => {       //on vérifie que l'utilisateur n'a pas disliké cet item 
                        if (response.findIndex(itemIdDislikeFunction) == -1) {
                            db.query(`INSERT INTO userDislikes (userIdDislike, userEmailDislike, idItemDislike) VALUES (${userId}, ${userEmail}, ${itemId})`, (err, response, field) => {  //si non, on l'ajoute
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
            db.query("SELECT COUNT(idItemDislike) FROM userDislikes WHERE idItemDislike=" + itemId , (err, result, fields) => {
                if(err){
                    console.log(err)
                }else{
                    let res = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                    db.query(`UPDATE item SET dislikes=${res} WHERE id=${itemId}`, (err, res, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log("modification enregistrée !")
                        }
                    })
                }
            })
            break;
    }
    switch (dislike) {
        case 2:
            db.query('SELECT * FROM userLikes WHERE userIdLike=?', userId, (err, res, field) => {
                if (res.findIndex(itemIdLikeFunction) != -1) {
                    db.query('DELETE FROM userLikes WHERE idItemLike=?', itemId, (err, response, field) => {  //si non, on le supprime
                        if (err) {
                            console.log("Utilisateur pas dans le tableau des likes")
                        } else {
                            console.log({ message: "Utilisateur supprimé au tableau like !" });
                        }
                    })
                }
            })
            db.query("SELECT COUNT(idItemLike) FROM userLikes WHERE idItemLike=" + itemId , (err, result, fields) => {
                if(err){
                    console.log(err)
                }else{
                    let res = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                    db.query(`UPDATE item SET likes=${res} WHERE id=${itemId}`, (err, res, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log("modification enregistrée !")
                        }
                    })
                }
            })
            break;

        case -2:
            db.query('SELECT * FROM userDislikes WHERE userIdDislike=?', userId, (err, res, field) => {
                if (res.findIndex(itemIdDislikeFunction) != -1) {
                    db.query('DELETE FROM userDislikes WHERE idItemDislike=?', itemId, (err, response, field) => {  //si non, on le supprime
                        if (err) {
                            console.log("Utilisateur pas dans le tableau des dislikes")
                        } else {
                            console.log({ message: "Utilisateur supprimé au tableau dislike !" });
                        }
                    })
                }
            })
            db.query("SELECT COUNT(idItemDislike) FROM userDislikes WHERE idItemDislike=" + itemId , (err, result, fields) => {
                if(err){
                    console.log(err)
                }else{
                    let res = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                    db.query(`UPDATE item SET dislikes=${res} WHERE id=${itemId}`, (err, res, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log("modification enregistrée !")
                        }
                    })
                }
            })
            break;
    }
}
