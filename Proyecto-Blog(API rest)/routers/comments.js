const express = require('express');
const router = express.Router();
const db = require('../database/config');
const commentsModel = require('../database/models/comments.model');
const { verificarUsuario } = require('../utils/middlewares');

router.use(verificarUsuario);

router.get('/', async (req, res) => {
    res.send( 'ingreso un comentario' );

    const comments = await articleModel.findAll(
        {where: {deleted:false} , raw: true, nest: true, include: [{model: comments}] },
        );
    
    res.send(comments);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!isNaN(id)) {
        const comments = await commentsModel.findOne( 
            { 
                where: { id: id, deleted: false} 
            } 
        );
        res.send(comments);
    } else {
        res.send('Error')
    }
});

router.post('/', async (req, res) => {
    const { contentCom, user_Id, articles_id, created_at, deleted } = req.body; 
    deleted = false;

    const comments = await articleModel.create({
        userId: user_Id,
        contentCom: contentCom,
        articlesId: articles_id,
        createdAt: created_at,
        deleted: deleted
    })

    res.send(comments)

    res.send(comments.toJSON());
})

router.put('/:id', verificarUsuario, async (req, res) => {
    const { contentCom, user_Id, articles_id, created_at} = req.body;
    const id = req.params.id;


    const comments = await commentsModel.findOne( { where: {id} } )

    comments.user_Id = user_Id;
    comments.contentCom = contentCom;
    comments.articlesId = articles_id;
    comments.createdAt = created_at;

    comments.save();

    res.send(comments)
   
})

router.delete('/:id', verificarUsuario, async (req, res) => {
    const id = req.params.id;

    const comments = await commentsModel.findOne( { where: {id} } )
    comments.deleted = true;
    comments.save();

    res.send('Borrado correctamente')
})