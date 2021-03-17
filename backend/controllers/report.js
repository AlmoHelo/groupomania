const db = require('../database')

require('dotenv').config()


//Affichage de tous les signalements d'articles dans ordre descendant
exports.getAllItem = (req, res, next) => {
    db.query('SELECT * FROM report WHERE idReportItem IS NOT NULL ORDER BY dateReport DESC ', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        db.query(`SELECT * FROM report FULL JOIN item ON idReportItem = item.id`, (error, resp, fields) => {
            if (error) {
                return res.status(400).json({ error })
            }
            return res.status(200).json(resp)
        })
    })
}

//Affichage de tous les signalements de commentaires dans ordre descendant
exports.getAllComment = (req, res, next) => {
    db.query('SELECT * FROM report WHERE idReportComment IS NOT NULL ORDER BY dateReport DESC ', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        db.query(`SELECT * FROM report FULL JOIN comment ON idReportComment = comment.idComment`, (error, resp, fields) => {
            if (error) {
                return res.status(400).json({ error })
            }
            return res.status(200).json(resp)
        })
    })
}

//Créer un signalement
exports.create = (req, res, next) => {
    const itemId = req.body.itemId
    const userId = req.body.userId
    const commentId = req.body.commentId
    console.log(itemId)

    const searchUser = (element) => {
        return element.idReportUser === userId
    };

    if (itemId != undefined) {                                //signalement des items
        const searchItem = (element) => {
            return element.idReportItem === itemId
        };
        db.query(`SELECT * FROM report WHERE (idReportUser=${userId}) AND (idReportItem=${itemId})`, (err, response, fields) => {
            console.log(response.findIndex(searchUser))
            console.log(response.findIndex(searchItem))
            if (response.findIndex(searchUser) != 0 && response.findIndex(searchItem) != 0) {     //pas de signalement pour cet article 
                db.query(`INSERT INTO report (idReportItem, dateReport, idReportUser) VALUES (${itemId}, NOW(), ${userId})`, (err, result, fields) => {
                    if (err) {
                        return res.status(400).json("Une erreur s'est produite. Veuillez réessayer !")
                    } else {
                        return res.status(201).json('Votre signalement sur l\'article a été posté !')
                    }
                })
            } else {
                return res.status(201).json('Votre signalement sur l\'article a déjà été posté !')
            }
        })
    } else {                               //signalement des commentaires
        const searchComment = (element) => {
            return element.idReportComment === commentId
        };
        db.query(`SELECT * FROM report WHERE (idReportUser=${userId}) AND (idReportComment=${commentId})`, (err, response, fields) => {
            if (response.findIndex(searchUser) != 0 && response.findIndex(searchComment) != 0) {     //pas de signalement pour cet article 
                db.query(`INSERT INTO report (idReportComment, dateReport, idReportUser) VALUES (${commentId}, NOW(), ${userId})`, (err, result, fields) => {
                    if (err) {
                        return res.status(400).json("Une erreur s'est produite. Veuillez réessayer !")
                    } else {
                        return res.status(201).json('Votre signalement sur le commentaire a été posté !')
                    }
                })
            } else {
                return res.status(201).json('Votre signalement sur le commentaire a déjà été posté !')
            }
        })
    }
}

//Delete le report
exports.delete = (req, res, next) => {
    db.query(
        `DELETE FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Le signalement a bien été enlevé !' })
        }
    )
}

//Delete item reported or comment reported

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

exports.deleteOne = (req, res, next) => {
    db.query(
        `SELECT * FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            const idItem = resp[0].idReportItem
            const idComment = resp[0].idReportComment
            if (idItem != null) {                           //supprime un item signalé
                db.query(
                    `DELETE FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
                        if (error) {
                            return res.status(400).json(error)
                        }
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
                )
            } else if (idComment != null){                          //supprime un commentaire signalé
                db.query(
                    `DELETE FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
                        if (error) {
                            return res.status(400).json(error)
                        }
                        db.query(
                            `DELETE FROM comment WHERE idComment=${idComment}`, (error, resp, fields) => {
                                if (error) {
                                    return res.status(400).json(error)
                                }
                                return res.status(200).json({ message: 'Le commentaire a bien été supprimé du tableau report et comment !' })
                            }
                        )
                    }
                )
            }
        }
    )
}