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
exports.deleteOne = (req, res, next) => {
    db.query(
        `SELECT * FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            const idItem = resp[0].idReportItem
            const idComment = resp[0].idReportComment
            console.log(idItem)
            console.log(idComment)
            if (idItem != null) {                           //supprime un signalement d'item
                db.query(
                    `DELETE FROM report WHERE idReport=${req.params.id}`, (error, resp, fields) => {
                        if (error) {
                            return res.status(400).json(error)
                        }
                        db.query(
                            `DELETE FROM item WHERE id=${idItem}`, (error, resp, fields) => {
                                if (error) {
                                    return res.status(400).json(error)
                                }
                                return res.status(200).json({ message: 'L\'article a bien été supprimé du tableau report et item !' })
                            }
                        )
                    }
                )
            } else if (idComment != null){                          //supprime un signalement de commentaire
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