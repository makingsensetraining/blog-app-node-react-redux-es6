import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';
import moment from 'moment';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '../app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1', author: 'Juan Cook - MKS', publishedDate: '2016-11-10' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2', author: 'Juan Cook - MKS', publishedDate: '2016-11-11' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3', author: 'Juan Cook - MKS', publishedDate: '2016-11-12' },
    { id: 4, title: 'Post 4', content: 'Content of Post 4', author: 'Juan Cook - MKS', publishedDate: '2016-11-13' },
    { id: 5, title: 'Post 5', content: 'Content of Post 5', author: 'Juan Cook - MKS', publishedDate: '2016-11-14' }
];

function generateNextId(posts) {
    let lastId = 0;
    posts.map(post => {
        if (post.id > lastId) {
            lastId = post.id;
        }
    });

    return ++lastId;
}

// get all posts
app.get('/api/posts', function (req, res) {
    res.send(posts);
});

app.post('/api/posts', function(req, res){
    var post = req.body.post;

    post.id = generateNextId(posts);
    post.publishedDate = moment().format('YYYY-MM-DD');

    posts.push(post);

    res.send(post);
});

app.get('/api/post/:id', function(req, res){
    var postId = req.param('id');
    const post = posts.find(post => post.id == postId);

    if (post){
        res.send(post);
    } else {
        res.send(404, {error: 'Post not found'});
    }
});

app.get("/*", function (req, res) {
     res.sendFile(path.join( __dirname, '../app/index.html'));
   })
   .listen(port, function(err) {
     if (err) return  console.log(err);
     open(`http://localhost:${port}`);
   });
