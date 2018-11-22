const store = require('../model/store')

const isPost = (id) => {
  if (store.posts[id]) {
    return store.posts[id].comments
  }
  return false
}

const isComment = (id, cid) => {
  if (store.posts[id].comments[cid]) {
    return store.posts[id].comments[cid]
  }
  return false
}

class comment {
  constructor() {
  }

  getComment(req, res){
    const id = req.params.postId
    if(isPost(id)){
      const comment = isPost(id)
      res.send({ok: true, comment})
    }else {
      res.status(403).send({ok: false, message: 'Post Id Not Exists'})
    }
  }

  addComment(req, res){
    const text = req.query.text
    const postId = req.params.postId
    let status = {'ok': false}
    if (text) {
      if (isPost(postId)) {
        const id = store.posts[postId].comments.length
        // console.log(store.posts);
        store.posts[postId].comments.push({text})
        status = {'ok': true, 'id': id}
      }else {
        status = {'ok': false, 'message': 'Post Id Not Exists'}
      }
    }else {
      status = {'ok': false, 'message': 'Please provide required queries'}
    }
    res.status(status.ok ? 201 : 403).send({...status})
  }

  updateComment(req, res){
    let status = {'ok': false}
    try {
      const postId = req.params.postId
      const commentId = req.params.commentId
      const text = req.query.text
      if(postId){
        if (isPost(postId)) {
          if (isComment(postId, commentId)) {
            if (text) {
              let comment = isComment(postId, commentId)
              if (text) {
                comment.text = text
              }
              status = {ok: true, postId}
            }else {
              status.message  = 'Please provide required queries'
            }
          }else {
            status.message = 'Comment Id Not Exists In The Given Post'
          }
        } else {
          status.message = 'Post Id Not Exists'
        }
      } else {
        status.message  = 'Please provide required parameters'
      }
      res.status(status.ok ? 203 : 403).send({...status})
    } catch (e) {
      console.log(e);
      res.status(505).send({...status, message: 'Internal Server Error'})
    }
  }

  removeComment(req, res){
    const postId = req.params.postId
    const commentId = req.params.commentId
    let status = {'ok': false}
    try {
      if(postId){
        if (isPost(postId)) {
          if (isComment(postId, commentId)) {
            store.posts[postId].comments.splice(commentId, 1)
            status = {ok: true, commentId}
          }else {
            status.message = 'Comment Id Not Exists In The Given Post'
          }
        }else {
          status.message = 'Post Id Not Exists'
        }
      }else {
        status.message  = 'Please provide required queries'
      }
      res.status(status.ok ? 202 : 403).send({...status})
    } catch (e) {
      console.log(e);
      res.status(505).send({...status, message: 'Internal Server Error'})
    }
  }
}

module.exports = comment
