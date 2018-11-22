const express = require('express')
const comment = new (require('../controller/comment'))()
const router = express.Router()

router.get('/:postId/comments', comment.getComment)
router.post('/:postId/comments', comment.addComment)
router.put('/:postId/comments/:commentId', comment.updateComment)
router.delete('/:postId/comments/:commentId', comment.removeComment)

module.exports = router
