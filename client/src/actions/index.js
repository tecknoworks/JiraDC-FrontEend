import { PageActionTypes, fetchPages, fetchPage, addPage, removePage } from './pageActions';
import { TierActions, addTier, requestTiersByPage, activateTier, removeTier } from './tierActions';
import { PostActions, addPost, requestPostsByPage, removePost } from './postActions';
import { AuthActionsTypes, register ,login, logout,getAllUsers } from './authActions';
import { ProjectActionsTypes, postProject, getProject , getKanbanProject,getScrumProject, getBugtrackingProject} from './projectActions';
import { IssueActionsTypes, getIssue } from './issueActions';
import { LabelActionsTypes, getLabel, postLabel } from './labelActions';
import { PriorityActionsTypes, getPriority } from './priorityActions';
import { ComponentActionsTypes, getComponent, postComponent, updateComponent, userUpdateComponent,getComponentProject} from './componentActions';
import { LinkedIssuesActionsTypes, getLinkedIssues } from './linkedissuesActions';
import {  CommentActionsTypes,postComment, putComment } from './commentActions'
import { SprintActionsTypes,getSprint, postSprint, updateSprint, userUpdateSprint} from './sprintActions'
import { WorkItemActionsTypes, getWorkItem, postWorkItem, getWorkItemEpic,getWorkItemProject, getWorkItemById, userUpdateWorkItem, updateWorkItem, localUpdateWorkItemSprintItems, changeItemPosition, changeItemPositionBTSprints,localUpdateWorkItemStatusItems, changeItemPositionStatus,changeItemStatus} from './workItemActions'

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

    //issue
    IssueActionsTypes,
    getIssue,

    //label
    LabelActionsTypes,
    getLabel,
    postLabel,

        
    //Priority
    PriorityActionsTypes,
    getPriority,

     //Component
     ComponentActionsTypes,
     getComponent,
     postComponent,
     updateComponent,
     userUpdateComponent,
     getComponentProject,

    //LinkedIssues
    LinkedIssuesActionsTypes,
    getLinkedIssues,

     //Sprint
     SprintActionsTypes,
     getSprint,
     postSprint,
     updateSprint,
     userUpdateSprint,

     //WorkItem
     WorkItemActionsTypes,
     getWorkItem,
     postWorkItem,
     getWorkItemEpic,
     getWorkItemProject,
     getWorkItemById,
     updateWorkItem,
     userUpdateWorkItem,
     localUpdateWorkItemSprintItems,
     changeItemPosition,
     changeItemPositionBTSprints,
     localUpdateWorkItemStatusItems,
     changeItemPositionStatus,
     changeItemStatus,
 
     //Comments
     CommentActionsTypes,
     postComment,
     putComment,
};