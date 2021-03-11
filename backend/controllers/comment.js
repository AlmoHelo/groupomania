const db = require('../database')


require('dotenv').config()

//Affichage de tous les commentaires dans ordre descendant
exports.getAll = (req, res, next) => {
    let itemId = req.params.id
    db.query(`SELECT * FROM comment WHERE itemId=${itemId} ORDER BY dateComm DESC`, (error, result, field) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ error })
        }
        return res.status(200).json(result)
    })
}

//Créer un commentaire
exports.create = (req, res, next) => {
    const itemId = req.body.itemId
    const userCommId = req.body.userCommId
    const description = req.body.description;
    const pseudoUserComm = req.body.pseudoUserComm
    //const imageURL
    db.query(`INSERT INTO comment (itemId, userCommId, descriptionComm, dateComm, pseudoUserComm) VALUES(${itemId}, ${userCommId}, "${description}", NOW(), "${pseudoUserComm}")`, (err, response, fields) => {
        if (err) {
            console.log(err)
            return res.status(400).json("erreur")
        }
        res.status(201).json('Votre commentaire a été posté !')
        //Compter le nombre de commentaires
        db.query(`SELECT COUNT(idComment) FROM comment WHERE itemId=${itemId}`, (err, result) => {
            if (err) {
                return res.status(400).json(err)
            } else {
                let response = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                db.query(`UPDATE item SET nbComm=${response} WHERE id=${itemId}`, (error, res) => {
                    if (err) {
                        return res.status(400).json(err)
                    } else {
                        console.log('Nombre de commentaires mis à jour')
                    }
                })
            }
        })
    })
}

//Modifier un commentaire 
exports.update = (req, result, next) => {
    const description = req.body.description
    const id = parseInt(req.params.id)
    db.query(
        `UPDATE comment SET descriptionComm="${description}", dateComm=NOW() WHERE idComment=${id}`, (error, res) => {
            if (error) {
                console.log(error)
                return result.status(400).json(error)
            } else {
                result.status(200).json({ message: "Item modifié" })
            }
        }
    )
}

//Delete one commentaire
exports.delete = (req, res, next) => {
    let itemId = req.body.itemId
    db.query(
        'DELETE FROM comment WHERE idComment= ?', req.params.id, (error, result, fields) => {
            if (error) {
                return res.status(400).json(error)
            }
            res.status(200).json({ message: 'Votre message a bien été supprimé !' })
            db.query(`SELECT COUNT(idComment) FROM comment WHERE itemId=${itemId}`, (err, result) => {
                if (err) {
                    return res.status(400).json(err)
                } else {
                    let response = JSON.parse(JSON.stringify(result).split(':')[1].split("}")[0])
                    db.query(`UPDATE item SET nbComm=${response} WHERE id=${itemId}`, (error, res) => {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            console.log('Nombre de commentaires mis à jour')
                        }
                    })
                }
            })
        }
    )
}



