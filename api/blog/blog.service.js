import moment from "moment";
'use-strict';


const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1', author: 'Juan Cook MKS', publishedDate: '2016-11-10' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2', author: 'Juan Cook MKS', publishedDate: '2016-11-11' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3', author: 'Juan Cook MKS', publishedDate: '2016-11-12' },
    { id: 4, title: 'Post 4', content: 'Content of Post 4', author: 'Juan Cook MKS', publishedDate: '2016-11-13' },
    { id: 5, title: 'Post 5', content: 'Content of Post 5', author: 'Juan Cook MKS', publishedDate: '2016-11-14' }
];

var generateNextId;


class BlogService {
    constructor() {
        generateNextId = (posts) => {
            let lastId = 0;
            posts.map(post => {
                if (post.id > lastId) {
                    lastId = post.id;
                }
            });
        };
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

