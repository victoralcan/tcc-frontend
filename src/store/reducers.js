import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import product from './product/productReducer'

const rootReducer = combineReducers({

    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,

    // ecommerce
    product

});

export default rootReducer;