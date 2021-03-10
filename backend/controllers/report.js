const db = require('../database')

require('dotenv').config()


//Affichage de tous les signalements dans ordre descendant
exports.getAll = (req, res, next) => {
    db.query('SELECT * FROM report ORDER BY date DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
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

    if (itemId != undefined) {
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
    } else {
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


//Delete one report
exports.delete = (req, resp, next) => {
    db.query(
        'DELETE FROM item WHERE id= ?', req.params.id, (error, res, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
        }
    )
}

