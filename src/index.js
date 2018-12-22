import './stylesheets/main.scss';
import './javascripts/wrtc/wrtc';
import signup from './javascripts/auth/signup';
import login from './javascripts/auth/login';
import uploadImage from './javascripts/partial/form/upload-image';

import Category from './javascripts/admin/article/category/Category';
import Article from './javascripts/admin/article/Article';

const SIGNUP_SELECTOR = '#signup-form';
const LOGIN_SELECTOR = '#login-form';
const UPLOAD_IMAGE_SELECTOR = '#upload-image-form';

signup(SIGNUP_SELECTOR);
login(LOGIN_SELECTOR);
uploadImage(UPLOAD_IMAGE_SELECTOR);

// Category
const CategoryObj = new Category;
const ArticleObj = new Article;
CategoryObj.add();
ArticleObj.addMultipart();
ArticleObj.update();
