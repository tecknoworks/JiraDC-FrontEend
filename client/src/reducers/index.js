import { combineReducers } from 'redux';
import { pages, page } from './pages';
import { tiers } from './tiers';
import { posts } from './posts';
import { register , login,logout} from './auth';
import { postProject, getProject} from './project';

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
});