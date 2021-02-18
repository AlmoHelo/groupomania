const db = require('../database')

//Affichage d'un commentaire
exports.getOne = (req, res, next) => {
    db.query('SELECT * FROM comment WHERE itemId= ?', req.params.idComment, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Affichage de toutes les commentaires 
exports.getAll = (req, res, next) => {
    db.query('SELECT * FROM comment', (error, result, field) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result)
    })
}

//creation du commentaire 
exports.create = (req, res, next) => {
    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    const reponseComm = {
        itemId: req.body.itemId,
        userCommId: req.body.userCommId,
        descriptionComm: req.body.descriptionComm,
        dateComm: currentDate
    }
    db.query(`INSERT INTO comment SET ?`, reponseComm, (error, result, field) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(201).json({ message: 'Votre commentaire a été posté !' })
    })
}

//Modifier un commentaire 
exports.update = (req, res, next) => {
    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    const descriptionComm = req.body.descriptionComm
    const idComment = req.body.idComment
    db.query(
        `UPDATE comment SET descriptionComm='${descriptionComm}', dateComm='${currentDate} WHERE idComment=${idComment}`, (error, results, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre commentaire a bien été modifié !' })
        }
    )
}

//Effacer un commentaire
exports.delete = (req, res, next) => {
    db.query(
        'DELETE FROM comment WHERE idComment= ?', req.body.idComment, (error, results, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre commentaire a bien été supprimé !' })
        }
    )
}