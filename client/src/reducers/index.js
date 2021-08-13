import { combineReducers } from 'redux';
import { pages, page } from './pages';
import { tiers } from './tiers';
import { posts } from './posts';
import { register , login,logout,getAllUsers} from './auth';
import { postProject, getProject} from './project';
import { getIssue } from './issue';
import { getLabel, postLabel } from './label';
import { getPriority} from './priority';
import { getComponent, postComponent} from './component';
import { getLinkedIssues} from './linkedissues';
import { getSprint} from './sprint';
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
    getIssue,
    getLabel,
    postLabel,
    getAllUsers,
    getPriority,
    getComponent,
    getLinkedIssues,
    getSprint,
    postComponent,
});