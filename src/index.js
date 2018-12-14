import './stylesheets/main.scss';
import signup from './javascripts/auth/signup';
import login from './javascripts/auth/login';

const SIGNUP_SELECTOR = '#signup-form';
// const LOGIN_SELECTOR = '#login-form';
const LOGIN_SELECTOR2 = '[type="submit"]';

signup(SIGNUP_SELECTOR);
login(LOGIN_SELECTOR2);
