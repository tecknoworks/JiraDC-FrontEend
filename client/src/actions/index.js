import { PageActionTypes, fetchPages, fetchPage, addPage, removePage } from './pageActions';
import { TierActions, addTier, requestTiersByPage, activateTier, removeTier } from './tierActions';
import { PostActions, addPost, requestPostsByPage, removePost } from './postActions';
import { AuthActionsTypes, register ,login, logout,getAllUsers } from './authActions';
import { ProjectActionsTypes, postProject, getProject , getKanbanProject,getScrumProject, getBugtrackingProject} from './projectActions';
import {  PriorityActionsTypes,getPriority } from './priorityActions';
import {  ComponentActionsTypes,getComponent } from './componentActions';
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
    getAllUsers,

    //Project
    ProjectActionsTypes,
    postProject,
    getProject,
    getKanbanProject,
    getScrumProject,
    getBugtrackingProject,
    
    //Priority
    PriorityActionsTypes,
    getPriority,

     //Component
     ComponentActionsTypes,
     getComponent,
};