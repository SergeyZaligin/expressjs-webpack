import './stylesheets/main.scss';
import signup from './javascripts/auth/signup';
import login from './javascripts/auth/login';

const SIGNUP_SELECTOR = '#signup-form';
const LOGIN_SELECTOR = '#login-submit-btn';

signup(SIGNUP_SELECTOR);
login(LOGIN_SELECTOR);
