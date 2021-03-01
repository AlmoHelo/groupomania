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
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    const description = req.body.description;
    console.log(description)
    const pseudoUser = req.body.pseudoUser
    console.log(pseudoUser)
    //const imageURL
    db.query(`SELECT userId FROM user INNER JOIN item ON pseudo = pseudoUser WHERE pseudo= "` + pseudoUser + `"`, (err, response, fields) => {
        if (err) {
            console.log(err)
        } else {
            const userItemId = JSON.parse(JSON.stringify(response));
            const sqlItemPost = "INSERT INTO item (date, description, likes, dislikes, pseudoUser, userItemId) VALUES ( NOW(), ?, 0, 0, ?, ?)"
            const postItem = db.format(sqlItemPost, [description, pseudoUser, userItemId[0].userId])
            db.query(postItem, (error, result) => {
                if (error) {
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
        `UPDATE item SET description='${description}' WHERE id=${id}`, (error, results, fields) => {
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

