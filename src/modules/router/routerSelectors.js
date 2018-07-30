// @flow
import type { State } from 'modules/actions/types';

export
const selectors = {
	getUniverse: (state: State): string => (/box-search/.test(state.router.location.pathname) ? state.router.location.pathname.split('/').pop() : ""),
	getPathName: (state: State): string => (state.router.location.pathname),
}