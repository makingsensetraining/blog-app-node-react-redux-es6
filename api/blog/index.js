'use strict';

import {Router} from 'express';
import controller from './blog.controller';

var router = new Router();

router.get('/api/posts', controller.findAll);
router.get('/api/posts/:id', controller.findById);
router.post('/api/posts', controller.create);
router.delete('/api/posts/:id', controller.delete);
router.put('/api/posts', controller.update);

module.exports = router;
