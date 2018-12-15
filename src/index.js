import './stylesheets/main.scss';
import signup from './javascripts/auth/signup';
import login from './javascripts/auth/login';
import uploadImage from './javascripts/partial/form/upload-image';

const SIGNUP_SELECTOR = '#signup-form';
const LOGIN_SELECTOR = '#login-form';
const UPLOAD_IMAGE_SELECTOR = '#upload-image-form';

signup(SIGNUP_SELECTOR);
login(LOGIN_SELECTOR);
uploadImage(UPLOAD_IMAGE_SELECTOR);
