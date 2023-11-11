var express = require('express');
const { post, route } = require('../../book/routes');
var router = express.Router();
var POSTS = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/create', function(req, res, next) {
  res.render('create');
});


router.post('/create', function(req, res, next) {
  const post = {...req.body, Date : new Date(), like:0};
  POSTS.push(post);
  res.redirect('/read')
  
});

router.get('/read', function(req, res, next) {
  res.render('read',{ post:POSTS});
});

router.get('/delete/:index',function(req, res,next){
  POSTS.splice(req.params.index,1)
  res.redirect('/read')

});
router.get('/update/:index',function(req, res, next){
  const Post = POSTS[req.params.index]
  res.render('update',{post : Post , index:req.params.index})
  
})
router.post('/update/:index',function(req, res, next){
  POSTS[req.params.index]=req.body;
  res.redirect(`/read`)
})

router.get('/like/:index',function(req, res, next){
  const post=POSTS[req.params.index];
  post.like +=1;
  POSTS[req.params.index]=post;
  res.redirect('/read')
  
  
})





module.exports = router;
