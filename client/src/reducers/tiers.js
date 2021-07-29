import { TierActions } from '../actions';

const initialState = {
    loadingTiers: false,
    data: [],

    addProgress: false,

    activateProgress: false,
    activateId: null
}

export function tiers(state = initialState, action) {
    switch (action.type) {
        case TierActions.REQUEST_TIERS_BY_PAGE:
            return { ...state, loadingTiers: true };
        case TierActions.REQUEST_TIERS_BY_PAGE_SUCCESS:
            return { ...state, data: action.tiers, loadingTiers: false };
        case TierActions.REQUEST_TIERS_BY_PAGE_ERROR:
            return { ...state, data: [], loadingTiers: false };

        case TierActions.ADD_TIER:
            return { ...state, addProgress: true };
        case TierActions.ADD_TIER_SUCCESS:
            return { ...state, data: [...state.data, action.tier], addProgress: false };
        case TierActions.ADD_TIER_ERROR:
            return { ...state, addProgress: false };

        case TierActions.ACTIVATE_TIER:
            return { ...state, activateProgress: true, activateId: action.id };
        case TierActions.ACTIVATE_TIER_SUCCESS:
            let tiers = state.data.map(tier => {
                tier.active = action.tier._id == tier._id;
                return tier;
            });

            return { ...state, data: tiers, activateProgress: false, activateId: null };
        case TierActions.ACTIVATE_TIER_ERROR:
            return { ...state, activateProgress: false, activateId: null };
    }

    return state;
}