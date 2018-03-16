 // @flow
 
type FiltersConfig = { +[string]: {filterGroup?: string} };

export
const findRelatedFilters = (filtersConfig: FiltersConfig, filterName: string): Array<string> => {
	if(typeof filtersConfig[filterName] === 'undefined' || typeof filtersConfig[filterName]['filterGroup'] === 'undefined')
		return [];

	const filterGroupToSearch = filtersConfig[filterName]['filterGroup'];
	let relatedFilters: Array<string> = [];

	for (const [thisFilterName, thisFilterConfig] of Object.entries(filtersConfig)) {
		if(thisFilterName !== filterName && typeof thisFilterConfig.filterGroup !== 'undefined' && thisFilterConfig.filterGroup === filterGroupToSearch)
			relatedFilters.push(thisFilterName);
	}

	return relatedFilters;
};

export
const findMultipleRelatedFilters = (filtersConfig: FiltersConfig, filters: Array<string>): Array<string> => {
	let relatedFilters = [];
	for (const filterName of filters) {
		relatedFilters = relatedFilters.concat(findRelatedFilters(filtersConfig, filterName));
	}

	return relatedFilters;
};