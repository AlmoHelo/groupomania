const db = require('../database')

require('dotenv').config()

//Affichage un item
exports.getOne = (req, res, next) => {
    db.query('SELECT * FROM item WHERE userId= ?', req.params.id, (error, result, field) => {
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
    const userId = req.body.userId;
    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    const description = req.body.description;
    //const imageURL
    const itemPost = new Item({
        userId,
        currentDate,
        description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        pseudoUser
    });
    const sqlItemPost = "INSERT INTO item SET ?"
    const postItem = db.format(sqlItemPost, [itemPost])
    itemPost.then(() =>
        db.query(postItem, (error, result, field) => {
            if (error) {
                return res.status(400).json({ error })
            }
            return res.status(201).json({ message: 'Votre message a été posté !' })
        })
    )
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

