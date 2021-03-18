const db = require('../database')

require('dotenv').config()

//Affichage un item
exports.getOne = (req, res, next) => {
    const itemId = req.params.id
    db.query(`SELECT * FROM item FULL JOIN user ON userItemId = user.userId WHERE id=${itemId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Affichage un item
exports.getAllProfil = (req, res, next) => {
    const userId = req.params.id
    db.query(`SELECT * FROM item WHERE userItemId=${userId}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

exports.getAllOtherUser = (req, res, next) => {
    const pseudo = req.params.id
    db.query(`SELECT * FROM item WHERE pseudoUser="${pseudo}"`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Affichage de tous les items dans ordre descendant
exports.getAll = (req, res, next) => {
    db.query('SELECT * FROM item FULL JOIN user ON userItemId = user.userId ORDER BY date DESC', (error, result, field) => {
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
    const description = req.body.description
    const pseudoUser = req.body.pseudoUser
    if (req.file == undefined) {            //si l'utilisateur ne met pas de photo de profil
        const imageURL = "NULL";
        db.query(`SELECT userId FROM user WHERE pseudo="${pseudoUser}"`, (err, response, fields) => {
            if (err) {
                console.log(err)
            } else {
                const userItemId = JSON.stringify(response[0].userId);
                const sqlItemPost = "INSERT INTO item (date, description, imageURL, likes, dislikes, pseudoUser, userItemId) VALUES ( ?, ?, ?, 0, 0, ?, ?)"
                const postItem = db.format(sqlItemPost, [currentDate, description, imageURL, pseudoUser, userItemId])
                db.query(postItem, (error, result) => {
                    if (error) {
                        console.log(error)
                        return res.status(400).json("erreur")
                    }
                    return res.status(201).json('Votre message a été posté !')
                })
            }
        })
    } else {                            //si l'utilisateur met une photo de profil
        const imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        db.query(`SELECT userId FROM user WHERE pseudo="${pseudoUser}"`, (err, response, fields) => {
            if (err) {
                console.log(err)
            } else {
                const userItemId = JSON.stringify(response[0].userId);
                const sqlItemPost = "INSERT INTO item (date, description, imageURL, likes, dislikes, pseudoUser, userItemId) VALUES ( ?, ?, ?, 0, 0, ?, ?)"
                const postItem = db.format(sqlItemPost, [currentDate, description, imageURL, pseudoUser, userItemId])
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
}

//Modifier un message 
exports.update = (req, result, next) => {
    const description = req.body.description
    const id = req.params.id
    if (req.file == undefined) {                //si l'utilisateur ne met pas de photo 
        db.query(`SELECT imageURL FROM item WHERE id=${id}`, (err, resp, fields) => {
            const imageURL = JSON.stringify(resp).split('"')[3];
            db.query(
                `UPDATE item SET description="${description}", imageURL="${imageURL}", date=NOW() WHERE id=${id}`, (error, res) => {
                    if (error) {
                        return result.status(400).json(error)
                    } else {
                        result.status(200).json({ message: "Item modifié" })
                    }
                }
            )
        })
    } else {                            //si l'utilisateur modifie sa photo de profil
        const imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        db.query(
            `UPDATE item SET description="${description}", imageURL="${imageURL}", date=NOW() WHERE id=${id}`, (error, res) => {
                if (error) {
                    return result.status(400).json(error)
                } else {
                    result.status(200).json({ message: "Item modifié" })
                }
            })
    }
}

//Delete one item
let deleteItemLike = (itemId) => {
    db.query(`DELETE FROM userLikes WHERE idItemLike=${itemId}`, (err, resp, fields) => {
        if(err){
            console.log(err)
        }else {
            console.log("supprimé des likes")
        }
    })
}
let deleteItemDislike = (itemId) => {
    db.query(`DELETE FROM userDislikes WHERE idItemDislike=${itemId}`, (err, resp, fields) => {
        if(err){
            console.log(err)
        }else {
            console.log("supprimé des dislikes")
        }
    })
}

exports.delete = (req, resp, next) => {
    db.query(
        `DELETE FROM item WHERE id=${req.params.id}`, (error, res, fields) => {
            if (error) {
                return resp.status(400).json(error)
            } else {
                db.query(`SELECT * FROM comment WHERE itemId=?`, req.params.id, (err, resp, fields) => {
                    if (resp.length > 0) {
                        db.query(`DELETE FROM comment WHERE itemId=?`, req.params.id, (err, res_, fields) => {
                            if (err) {
                                return resp.status(400).json(error)
                            } else {
                                db.query(`SELECT * FROM userLikes WHERE idItemLike=${req.params.id}`, (err, response, fields) => {
                                    console.log(response.length)
                                    if (response.length > 0) {
                                        const deleteLike = deleteItemLike(req.params.id)
                                    } else {
                                        const deleteDislike = deleteItemDislike(req.params.id)
                                    }
                                })
                            }
                        })
                    } else {
                        db.query(`SELECT * FROM userLikes WHERE idItemLike=${req.params.id}`, (err, response, fields) => {
                            if (response.length > 0) {
                                const deleteLike = deleteItemLike(req.params.id)
                            } else {
                                const deleteDislike = deleteItemDislike(req.params.id)
                            }
                        })
                    }
                })
                return resp.status(200).json({message: "ok"})
            }
        }
    )
}


//fonctions pour la route like
let searchUserInLike = (userId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT userIdLike FROM userLikes WHERE userIdLike=${userId} AND idItemLike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let searchUserInDislike = (userId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT userIdDislike FROM userDislikes WHERE userIdDislike=${userId} AND idItemDislike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteUserDislike = (userId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM userDislikes WHERE userIdDislike=${userId} AND idItemDislike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteUserLike = (userId, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM userLikes WHERE userIdLike=${userId} AND idItemLike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let addUserLike = (userId, userEmail, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO userLikes SET userIdLike=${userId}, userEmailLike=${userEmail}, idItemLike=${itemId} `, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let addUserDislike = (userId, userEmail, itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO userDislikes SET userIdDislike=${userId}, userEmailDislike=${userEmail}, idItemDislike=${itemId} `, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let countUserLike = (itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(idItemLike) FROM userLikes WHERE idItemLike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
            let myRep = JSON.stringify(resp).split(':')[1].split("}")[0]
            db.query(`UPDATE item SET likes=${myRep} WHERE id=${itemId}`, (err, result, fields) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    })
}
let countUserDislike = (itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(idItemDislike) FROM userDislikes WHERE idItemDislike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
            let myRep = JSON.stringify(resp).split(':')[1].split("}")[0]
            db.query(`UPDATE item SET dislikes=${myRep} WHERE id=${itemId}`, (err, result, fields) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    })
}
exports.like = async (req, res, next) => {
    const valueLike = req.body.valueLike;
    const userId = req.body.userId;
    const userEmail = JSON.stringify(req.body.email);
    console.log(userEmail)
    const itemId = req.body.idItem;
    console.log(itemId)

    try {
        const resLike = await searchUserInLike(userId, itemId)
        console.log(resLike, " L204")
        if (resLike.length == 0) {                                      //cas 1 : Like = 0 
            const resDislike = await searchUserInDislike(userId, itemId)
            console.log(resDislike, " L207")
            if (resDislike.length > 0) {                                //. dislike = 1
                if (valueLike == "like") {
                    const addUserLi = await addUserLike(userId, userEmail, itemId)
                    const deleteUserDis = await deleteUserDislike(userId, itemId)
                    console.log(deleteUserDis, " L212")
                    const countLike = await countUserLike(itemId)
                    const countDislike = await countUserDislike(itemId)
                    console.log(countLike, countDislike, " L235")
                    res.status(200).json({ addLike: true, message: "Like ajouté" })
                } else if (valueLike == "dislike") {
                    console.log("Déjà disliker")
                } else {
                    res.status(400).json({ message: "une erreur est survenue !" })
                }
            } else {                                                    //dislike = 0
                if (valueLike == "like") {
                    const addUserLi = await addUserLike(userId, userEmail, itemId)
                    console.log(addUserLi, " L221")
                    const countLike = await countUserLike(itemId)
                    console.log(countLike, " L247")
                    res.status(200).json({ addLike: true, message: "Like ajouté" })
                } else if (valueLike == "dislike") {
                    const addUserDis = await addUserDislike(userId, userEmail, itemId)
                    console.log(addUserDis, " L224")
                    const countDislike = await countUserDislike(itemId)
                    console.log(countDislike, " L253")
                    res.status(200).json({ addLike: false, message: "Dislike ajouté" })
                } else {
                    res.status(400).json({ message: "une erreur est survenue !" })
                }
            }
        } else {                                                    // cas 2 : like = 1
            const resDislike = await searchUserInDislike(userId, itemId)
            console.log(resDislike, " L232")
            if (resDislike.length > 0) {                            // dislike = 1
                if (valueLike == "like") {
                    const deleteUserDis = await deleteUserDislike(userId, itemId)
                    const countDislike = await countUserDislike(itemId)
                    console.log(deleteUserDis, " L235")
                    console.log(countDislike, " L267")
                } else if (valueLike == "dislike") {
                    const deleteUserLi = await deleteUserLike(userId, itemId)
                    console.log(deleteUserLi, " L238")
                    const countLike = await countUserLike(itemId)
                    console.log(countLike, " L272")
                } else {
                    res.status(400).json({ message: "une erreur est survenue !" })
                }
            } else {                                                // dislike = 0
                if (valueLike == "like") {
                    console.log("Utilisateur déjà au tableau des like")
                } else if (valueLike == "dislike") {
                    const addUserDis = await addUserDislike(userId, userEmail, itemId)
                    const deleteUserLi = await deleteUserLike(userId, itemId)
                    console.log(addUserDis, " L238")
                    const countLike = await countUserLike(itemId)
                    const countDislike = await countUserDislike(itemId)
                    console.log(countLike, countDislike, "  L285")
                    res.status(200).json({ addLike: false, message: "Dislike ajouté" })
                } else {
                    res.status(400).json({ message: "une erreur est survenue !" })
                }
            }
        }

    } catch (error) {
        console.log(error, " L167")
    }
}