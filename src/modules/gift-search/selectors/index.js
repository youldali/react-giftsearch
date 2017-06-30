//@flow

export const getUniverseSelector = (state: Object) => (state.giftSearch.universe);
export const getFilterSelector = (state: Object) => (state.giftSearch.filter);
export const getOrderSelector = (state: Object) => (state.giftSearch.order);