const express = require('express');
const articlesRouter = require('./routers/article')
const commentsRouter = require('./routers/comments')
const UsersRouter = require('./routers/users')
const articlesCommentsRouter = require('./routers/articleComments')


 const app = express();

 app.use(express.json())

 app.listen(8080, () => {
     console.log("Escuchando el puerto 8080")
 })


app.use('/article', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/users', UsersRouter);
app.use('/ArticleComments', articlesCommentsRouter);