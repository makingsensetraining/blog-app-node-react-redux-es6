'use strict';

// SERVICES
import UserService from './blog.service';

class BlogController {

    findAll(req, res, next) {
        UserService.findAll((err, posts) => {
            if (err) return next(err);

            res.status(200).json(posts);
        });
    }

    findById(req, res, next) {
        UserService.findById(req.params.id, (err, post) => {
            if (err) return next(err);

            res.status(200).json(post);
        });
    }

    update(req, res, next) {
        UserService.update(req.body.post, (err, post) => {
            if (err) return next(err);

            res.status(200).json(post);
        });
    }

    create(req, res, next) {
        UserService.create(req.body.post, (err, post) => {
            if (err) return next(err);

            res.status(200).json(post);
        });
    }

    delete(req, res, next) {
        UserService.delete(req.params.id, (err, postDeleted) => {
            if (err) return next(err);

            res.status(200).json(postDeleted);
        });

    }

}

export default new BlogController();
