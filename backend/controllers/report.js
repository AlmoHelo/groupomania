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



let searchReport = (idReport) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM report WHERE idReport=${idReport}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteReport = (idReport) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM report WHERE idReport=${idReport}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteItem = (idItem) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM item WHERE id=${idItem}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let searchComment = (idItem) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM comment WHERE itemId=${idItem}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteComment = (idItem) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM comment WHERE itemId=${idItem}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteItemLike = (itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM userLikes WHERE idItemLike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
let deleteItemDislike = (itemId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM userDislikes WHERE idItemDislike=${itemId}`, (err, resp, fields) => {
            if (err) {
                reject(resp)
            }
            resolve(resp)
        })
    })
}
exports.deleteOne = async (req, res, next) => {
    const idRep = req.params.id

    try {
        const searchRep = await searchReport(idRep)
        console.log(searchRep)
        const idItem = searchRep[0].idReportItem
        console.log(idItem)
        const idComment = searchRep[0].idReportComment
        console.log(idComment)
        if (idItem != null) {
            const deleteRep = await deleteReport(idRep)
            const deleteIt = await deleteItem(idItem)
            const searchComm = await searchComment(idItem)
            res.status(200).json({ message: "item supprimé" })
            if (searchComm.lenght > 0) {
                const deleteComm = await deleteComment(idItem)
                const deleteLike = await deleteItemLike(idItem)
                const deleteDislike = await deleteItemDislike(idItem)
                res.status(200).json({ message: "item supprimé" })
            }
        } else if(idItem == null && idComment != null){
            const deleteRep = await deleteReport(idRep)
            const deleteComm = await deleteComment(idComment)
            res.status(200).json({ message: "commentaire supprimé" })
        }
    } catch (error) {
        console.log(error, " L199")
    }
}