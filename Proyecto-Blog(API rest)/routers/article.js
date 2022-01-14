const express = require('express');
const router = express.Router();
const db = require('../database/config');
const articlesModel = require('../database/models/articles.model');
const { verificarAdmin } = require('../utils/middlewares');


router.get('/', async (req, res) => {
    res.send( 'ingreso un articulo' );

    const articles = await articleModel.findAll(
        {where: {deleted:false} , raw: true, nest: true, include: [{model: articles}] },
        );
    
    res.send(articles);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!isNaN(id)) {
        const articles = await articlesModel.findOne( 
            { 
                where: { id: id, deleted: false} 
            } 
        );
        res.send(articles);
    } else {
        res.send('Error')
    }
});

router.post('/', verificarAdmin, async (req, res) => {
    const { comments_id, user_id, title, contentArt, published_at, created_at } = req.body; 
    deleted = false;

    const articles = await articlesModel.create({
        commentsId: comments_id,
        userId: user_id,
        title: title,
        contentArt: contentArt,
        publishedAt: published_at,
        createdAt: created_at,
        deleted: deleted
    })

    res.send(articles)

    res.send(articles.toJSON());
})

router.put('/:id', verificarAdmin, async (req, res) => {
    const { comments_id, user_id, title, contentArt, published_at, created_at } = req.body;
    const id = req.params.id;


    const articles = await articlesModel.findOne( { where: {id} } )

    articles.comments_id = comments_id;
    articles.userId = user_id;
    articles.title = title;
    articles.contentArt = contentArt;
    articles.publishedAt = published_at;
    articles.createdAt = created_at;

    articles.save();

    res.send(articles)
   
})

router.delete('/:id', verificarAdmin, async (req, res) => {
    const id = req.params.id;

    const articles = await articlesModel.findOne( { where: {id} } )
    articles.deleted = true;
    articles.save();

    res.send('Borrado correctamente')
})


module.exports = router;