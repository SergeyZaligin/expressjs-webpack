const express = require('express');
const router = express.Router({strict: true});
const upload = require('../middleware/upload');

const controller = require('../controllers/admin');
const controllerAdminArticleCategory = require('../controllers/admin/article/category');
const controllerAdminArticle = require('../controllers/admin/article');

const guardRouter = require('../middleware/guardRouter');

// Main
router.get('/', guardRouter.guardAdminRoutes, controller.index);

// Article
router.get('/post/list/:page?*',
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.listPostPage
);
router.get('/post/list',
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.listPostPageRedirect
);
router.get('/post/add',
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.addPostPage
);
router.post('/post/add',
    upload.upload('uploads/article/thumbnail/'),
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.addPost
);
router.get('/post/update/:id',
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.updatePostPage
);
router.put('/post/update/:id',
    guardRouter.guardAdminRoutes,
    controllerAdminArticle.updatePost
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
router.get('/post/category/update/:id',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.updateCategoryPostPage);
router.put('/post/category/update',
    guardRouter.guardAdminRoutes,
    controllerAdminArticleCategory.updateCategoryPost);

module.exports = router;
