const express = require('express');
const router = express.Router();
const db = require('../database/config');
const { verificarUsuario } = require('../utils/middlewares');

router.use(verificarUsuario);

router.get('/:articles_id', async(req,res)=> {

    if(req.params.articles_id){
        const results = await db.query('SELECT o.id, o.created_at, o.title, o.username, op.contentComent, FROM articles_comments_user op JOIN articles o on op.articles_id = o.id JOIN comments p ON op.comments_id=p.id JOIN user u ON op.user_id = u.id WHERE o.id = ?', { type: db.QueryTypes.SELECT,
            replacements: [req.params.articles_id] });
    
        res.send(results)
    
    } else {
        res.send('Ingrese un id')
    }
})


router.post('/', async (req, res) => {
    const user_id = req.user.id;
    const { articles_id, comments_id, contentComent } = req.body;

    const comments = ( await db.query('SELECT * FROM comments WHERE id = ? AND deleted=false', { type: db.QueryTypes.SELECT, replacements: [comments_id] }) )[0];
    let { title } = ( await db.query('SELECT title FROM articles WHERE id = ?', {type: db.QueryTypes.SELECT, replacements: [articles_id] }) )[0]; 
    

    console.log(contentComent)
    if (comments.contentComent >= contentComent) {
        comments += articles.title * title;

        const search =  await db.query('SELECT * FROM articles_comments_user WHERE articles_id = ? AND comments_id = ?', { type: db.QueryTypes.SELECT, replacements: [articles_id, comments_id] });

        if( search.length > 0){
            let o_contentComent = search[0].contentComent;
            let n_contentComent = o_contentComent + contentComent;

            await db.query('UPDATE articles_comments_user SET quantity = ? WHERE articles_id = ? and comments_id = ?', { replacements: [n_contentComent, articles_id, comments_id] });

        } else {articles_comments_user
            await db.query('INSERT INTO articles_comments_user (articles_id, comments_id, user_id, contentComent) VALUES (?, ? ,? ,?)', { replacements: [articles_id, comments_id, user_id, contentComent] });
        }        

        await db.query('UPDATE articles SET title = ? WHERE id = ? ', { replacements: [title, articles_id] });

        let new_contentComent = comments.contentComent - contentComent;
        await db.query('UPDATE comments SET contentComent = ? WHERE id = ? ', { replacements: [new_contentComent, comments_id] });

        res.send('se ha añadido un nuevo comentario')
    } else {
        res.send('No hay ningun comentario detectado')
    }

})

module.exports = router;

