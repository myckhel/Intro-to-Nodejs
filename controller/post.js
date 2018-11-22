//get data
const store = require('../model/store')
//check if post exists by id
const isPost = (id) => {
  if (store.posts[id]) {
    return store.posts[id]
  }
  return false
}
//post class
class post {
  constructor() {

  }

  getPost(req, res){
    let post = store
    res.send({...post})
  }

  addPost(req, res){
    const query = req.query
    const name = query.name
    const url = query.url
    const text = query.text
    const comments = []
    if (name && url && text) {
      const id = store.posts.length
      store.posts.push({name, url, text, comments})
      res.status(201).send({'ok': true, 'id': id})
    } else {
      res.status(403).send({'ok': false, 'message': 'Please provide required queries'})
    }
  }

  updatePost(req, res){
    let status = {'ok': false}
    try {
      const postId = req.params.postId
      const query = req.query
      const name = query.name
      const url = query.url
      const text = query.text
      if(postId){
        if (isPost(postId)) {
          if (name || url || text) {
            let post = isPost(postId)
            if (name) {
              post.name = name
            }
            if (url) {
              post.url = url
            }
            if (text) {
              post.text = text
            }
            status = {ok: true, postId}
          }else {
            status.message  = 'Please provide required queries'
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

  removePost(req, res){
    const postId = req.params.postId
    let status = {'ok': false}
    try {
      if(postId){
        if (isPost(postId)) {
          store.posts.splice(postId, 1)
          status = {ok: true, postId}
        }else {
          status.message = 'Post Id Not Exists'
        }
      }else {
        status.message  = 'Please provide required parameters'
      }
      res.status(status.ok ? 202 : 403).send({...status})
    } catch (e) {
      console.log(e);
      res.status(505).send({...status, message: 'Internal Server Error'})
    }
  }
}

module.exports = post
