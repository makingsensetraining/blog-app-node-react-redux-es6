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

const posts = [];

function generatePosts(max){
    for(let i=0; i < max; i++ ){
        const nextId = i + 1;
        let post = {
            id: nextId,
            title: 'Post ' + nextId,
            content: 'Content of Post ' + nextId,
            author: 'Juan Cook MKS',
            publishedDate: '2016-11-10'
        };

        posts.push(post);
    }
}

generatePosts(100);

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
    res.status(200).send(posts);
});

app.post('/api/posts', function(req, res){
    var post = req.body.post;

    post.id = generateNextId(posts);
    post.publishedDate = moment().format('YYYY-MM-DD');

    posts.push(post);

    res.status(200).send(post);
});

app.get('/api/posts/:id', function(req, res){
    var postId = req.params.id;
    const post = posts.find(post => post.id == postId);

    if (post){
        res.status(200).send(post);
    } else {
        res.status(404).send({error: 'Post not found'});
    }
});

app.delete('/api/posts/:id', function(req, res){
    var postId = req.params.id;

    const indexOfPostToDelete = posts.findIndex(post => { //We search for the post search index
        return post.id == postId;
    });
    const postRemoved = posts.splice(indexOfPostToDelete, 1); //Remove from posts the searched post

    res.status(200).send({postId: postRemoved[0].id});
});

app.put('/api/posts', function(req, res){
    var updatedPost = req.body.post;

    const indexOfPostToUpdate = posts.findIndex(post => { //We search for the post search index
        return post.id == updatedPost.id;
    });
    posts.splice(indexOfPostToUpdate, 1, updatedPost); //Remove from posts the searched post

    res.status(200).send(updatedPost);
});

app.get("/*", function (req, res) {
     res.sendFile(path.join( __dirname, '../app/index.html'));
   })
   .listen(port, function(err) {
     if (err) return  console.log(err);
     open(`http://localhost:${port}`);
   });
