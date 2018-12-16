const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');
const controllerAdminArticleCategory = require('../controllers/admin/article/category');

const guardRouter = require('../middleware/guardRouter');

// Main
router.get('/', guardRouter.guardAdminRoutes, controller.index);

// Article
router.get('/post/list',
    guardRouter.guardAdminRoutes,
    controller.listPostPage
);
router.get('/post/add',
    guardRouter.guardAdminRoutes,
    controller.addPostPage
);
router.post('/post/add',
    guardRouter.guardAdminRoutes,
    controller.addPost
);
router.get('/post/update',
    guardRouter.guardAdminRoutes,
    controller.updatePostPage
);
router.put('/post/update',
    guardRouter.guardAdminRoutes,
    controller.updatePost
);

// Article category
router.get('/post/category/list',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.listCategoryPostPage
);
router.get('/post/category/add',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.addCategoryPostPage
);
router.post('/post/category/add',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.addCategoryPost);
router.get('/post/category/update',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.updateCategoryPostPage);
router.put('/post/category/update',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.updateCategoryPost);

module.exports = router;
