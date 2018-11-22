const express = require('express')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
var logger = require('morgan');
const app = express()

app.use(logger('dev'));
app.use('/posts', postRouter)
app.use('/posts', commentRouter)

app.get('/posts/:postId/comments', (req, res) => {
  const id = req.params.postId
  console.log(req.params.postId);
  const comments = store.posts[0].comments
  res.send({comments})
})

app.get('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(4000)

console.log('server running');
