import {combineReducers} from 'redux';
import app from './app.js'
import nav from './nav.js'

const index = combineReducers({
    app, nav
})

export default index