const express = require('express')
// const commentRouter = require('./comments')
const post = new (require('../controller/post'))()
const router = express.Router()

// router.use('/:postId/comments', commentRouter)

router.get('/', post.getPost)
router.post('/', post.addPost)
router.put('/:postId', post.updatePost)
router.delete('/:postId', post.removePost)

module.exports = router
