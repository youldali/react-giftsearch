// @flow
import type { Action, State } from 'modules/actions/types';

export
const selectors = {
	getUniverse: (state: State) => (state.router.location.pathname.split('/').pop())
}