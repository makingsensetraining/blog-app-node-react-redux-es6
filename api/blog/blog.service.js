import moment from "moment";
'use-strict';

const posts = [];

class BlogService {
    constructor() {
        let nextId = 0;
        while(nextId < 100){
            posts.push( {
                id: nextId++,
                title: 'Post ' + nextId,
                content: 'Content of Post ' + nextId,
                author: 'Juan Cook MKS',
                publishedDate: '2016-11-10'
            });
        }
    }

  findAll(cb) {
      return cb(null,posts)
  }

  findById(id, cb) {

      const post = posts.find(post => post.id == id);

      return cb(post? null: {error: 'Post not found'},post)
  }

  update(post, cb) {

      const indexOfPostToUpdate = posts.findIndex(foundPost => { //We search for the post search index
          return foundPost.id == post.id;
      });
      posts.splice(indexOfPostToUpdate, 1, post); //Remove from posts the searched post

      return cb(null,post)
  }

  create(post, cb) {
      post.id = generateNextId(posts);
      post.publishedDate = moment().format('YYYY-MM-DD');
      posts.push(post);

      cb(null, post);
  }

  delete(id, cb) {

      const indexOfPostToDelete = posts.findIndex(post => { //We search for the post search index
          return post.id == id;
      });
      const postRemoved = posts.splice(indexOfPostToDelete, 1); //Remove from posts the searched post

      cb(null, postRemoved);
  }
}

export default new BlogService();

