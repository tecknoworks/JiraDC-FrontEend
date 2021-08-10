import { combineReducers } from 'redux';
import { pages, page } from './pages';
import { tiers } from './tiers';
import { posts } from './posts';
import { register , login,logout,getAllUsers} from './auth';
import { postProject, getProject} from './project';
import {  getPriority} from './priority';
import {  getComponent} from './component';
export default combineReducers({
    pages,
    page,
    tiers,
    posts,
    register,
    login,
    logout,
    postProject,
    getProject,
    getAllUsers,
    getPriority,
    getComponent,
});