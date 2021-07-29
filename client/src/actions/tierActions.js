
import TierRequest from '../requests/tierRequests';
import { globalErrorHandler, responseToJson } from '../utils';

export const TierActions = {
    REQUEST_TIERS_BY_PAGE: 'REQUEST_TIERS_BY_PAGE',
    REQUEST_TIERS_BY_PAGE_SUCCESS: 'REQUEST_TIERS_BY_PAGE_SUCCESS',
    REQUEST_TIERS_BY_PAGE_ERROR: 'REQUEST_TIERS_BY_PAGE_ERROR',

    ADD_TIER: 'ADD_TIER',
    ADD_TIER_SUCCESS: 'ADD_TIER_SUCCESS',
    ADD_TIER_ERROR: 'ADD_TIER_ERROR',

    REMOVE_TIER: 'REMOVE_TIER',
    REMOVE_TIER_SUCCESS: 'REMOVE_TIER_SUCCESS',
    REMOVE_TIER_ERROR: 'REMOVE_TIER_ERROR',

    ACTIVATE_TIER: 'ACTIVATE_TIER',
    ACTIVATE_TIER_SUCCESS: 'ACTIVATE_TIER_SUCCESS',
    ACTIVATE_TIER_ERROR: 'ACTIVATE_TIER_ERROR',
};

// Request Tiers
export function requestTiersByPageBegin() {
    return {
        type: TierActions.REQUEST_TIERS_BY_PAGE
    };
}

export function requestTiersByPageSuccess(tiers) {
    return {
        type: TierActions.REQUEST_TIERS_BY_PAGE_SUCCESS,
        tiers
    };
}

export function requestTiersByPageError() {
    return {
        type: TierActions.REQUEST_TIERS_BY_PAGE_ERROR,
    };
}

export function requestTiersByPage(pageId) {
    return dispatch => {
        dispatch(requestTiersByPageBegin());

        return TierRequest.fetchTiersByPage(pageId)
            .then(response => responseToJson(response))
            .then(json => dispatch(requestTiersByPageSuccess(json)))
            .catch(error => {
                dispatch(requestTiersByPageError());
                return globalErrorHandler(error);
            });
    };
}

// Add Tier
export function addTierBegin() {
    return {
        type: TierActions.ADD_TIER
    };
}

export function addTierSuccess(tier) {
    return {
        type: TierActions.ADD_TIER_SUCCESS,
        tier
    };
}

export function addTierError() {
    return {
        type: TierActions.ADD_TIER_ERROR,
    };
}

export function addTier(data) {
    return dispatch => {
        dispatch(addTierBegin());

        return TierRequest.addTier(data)
            .then(response => responseToJson(response))
            .then(json => dispatch(addTierSuccess(json)))
            .catch(error => {
                dispatch(addTierError());
                return globalErrorHandler(error);
            });
    };
}

// Activate Tier
export function activateTierBegin(id) {
    return {
        type: TierActions.ACTIVATE_TIER,
        id
    };
}

export function activateTierSuccess(tier) {
    return {
        type: TierActions.ACTIVATE_TIER_SUCCESS,
        tier
    };
}

export function activateTierError() {
    return {
        type: TierActions.ACTIVATE_TIER_ERROR,
    };
}

export function activateTier(id) {
    return dispatch => {
        dispatch(activateTierBegin(id));

        return TierRequest.activateTier(id)
            .then(response => responseToJson(response))
            .then(json => dispatch(activateTierSuccess(json)))
            .catch(error => {
                dispatch(activateTierError());
                return globalErrorHandler(error);
            });
    };
}

// Remove Post
export function removeTierBegin() {
    return {
        type: TierActions.REMOVE_TIER
    };
}

export function removeTierSuccess() {
    return {
        type: TierActions.REMOVE_TIER_SUCCESS,
    };
}

export function removeTierError() {
    return {
        type: TierActions.REMOVE_TIER_ERROR,
    };
}

export function removeTier(id) {
    return dispatch => {
        dispatch(removeTierBegin());

        return TierRequest.removeTier(id)
            .then(response => responseToJson(response))
            .then(json => dispatch(removeTierSuccess()))
            .catch(error => {
                dispatch(removeTierError());
                return globalErrorHandler(error);
            });
    };
}