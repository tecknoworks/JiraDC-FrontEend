import { PageActionTypes, fetchPages, fetchPage, addPage, removePage } from './pageActions';
import { TierActions, addTier, requestTiersByPage, activateTier, removeTier } from './tierActions';
import { PostActions, addPost, requestPostsByPage, removePost } from './postActions';
import { AuthActionsTypes, register ,login, logout } from './authActions';
import { ProjectActionsTypes, postProject, getProject , getKanbanProject,getScrumProject, getBugtrackingProject} from './projectActions';
export {
    PageActionTypes,
    TierActions,
    PostActions,

    fetchPages,
    addPage,
    removePage,
    fetchPage,

    addTier,
    activateTier,
    requestTiersByPage,
    removeTier,

    addPost,
    requestPostsByPage,
    removePost,

    // Auth
    AuthActionsTypes,
    register,
    login,
    logout,

    //Project
    ProjectActionsTypes,
    postProject,
    getProject,
    getKanbanProject,
    getScrumProject,
    getBugtrackingProject,
};