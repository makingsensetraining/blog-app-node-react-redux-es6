import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1', author: 'Juan Cook - MKS', publishedDate: '2016-11-10' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2', author: 'Juan Cook - MKS', publishedDate: '2016-11-11' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3', author: 'Juan Cook - MKS', publishedDate: '2016-11-12' },
    { id: 4, title: 'Post 4', content: 'Content of Post 4', author: 'Juan Cook - MKS', publishedDate: '2016-11-13' },
    { id: 5, title: 'Post 5', content: 'Content of Post 5', author: 'Juan Cook - MKS', publishedDate: '2016-11-14' }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateNextId = (posts) => {
    let lastId = 0;
    posts.map(post => {
        if (post.id > lastId) {
            lastId = post.id;
        }
    });

    return ++lastId;
};

class BlogApi {
    /**
     * Function that returns all the Post
     * @returns {Promise}
     */
    static getAllPosts() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], posts));
            }, delay);
        });
    }

    /**
     * Function that based on an post object, will save it if it's new or update it if it doesn't have an id
     * @param post
     * @returns {Promise}
     */
    static savePost(post) {
        post = Object.assign({}, post); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minPostTitleLength = 3;
                if (post.title.length < minPostTitleLength) {
                    reject(`Title must be at least ${minPostTitleLength} characters.`);
                }
                const minPostContentLength = 5;
                if (post.content.length < minPostContentLength) {
                    reject(`Content must be at least ${minPostContentLength} characters.`);
                }

                if (post.id) {
                    const existingPostIndex = posts.findIndex(a => a.id == post.id);
                    posts.splice(existingPostIndex, 1, post);
                } else {
                    //Just simulating creation here.
                    //Cloning so copy returned is passed by value rather than by reference.
                    post.id = generateNextId(posts);
                    posts.push(post);
                }

                resolve(post);
            }, delay);
        });
    }

    /**
     * Function that taking a postId as an input will delete that post.
     * @param postId
     * @returns {Promise}
     */
    static deletePost(postId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfPostToDelete = posts.findIndex(post => {
                    post.id == postId;
                });
                posts.splice(indexOfPostToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default BlogApi;
