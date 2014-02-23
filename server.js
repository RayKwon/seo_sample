var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var post = require('./routes/post');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* RESTful API */
app.get('/', routes.index);
app.get('/api/posts', post.getAllPosts);
app.put('/api/posts/:post_id', post.editPost);
app.post('/api/posts', post.addPost);
app.delete('/api/posts/:post_id', post.deletePost);

/* Render page for SEO spider */
var renderIndex = function(req, res, next) {
  if (req.query.hasOwnProperty('_escaped_fragment_')) {
    next();
  }else{
    res.render('index');
  }  
};

/* Render page - When user sends request by calling URL directly 
 * i.e. typing URL or refreshing browser
 */
app.get('/posts', renderIndex, post.renderPostList);
app.get('/posts/:post_id', renderIndex, post.renderPostDetail);
app.get('/posts/edit/:post_id', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
