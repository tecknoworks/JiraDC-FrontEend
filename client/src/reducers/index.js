import { combineReducers } from 'redux';
import { pages, page } from './pages';
import { tiers } from './tiers';
import { posts } from './posts';
import { register , login} from './auth';

export default combineReducers({
    pages,
    page,
    tiers,
    posts,
    register,
    login
});