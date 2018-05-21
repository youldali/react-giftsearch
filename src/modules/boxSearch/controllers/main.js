//@flow
import filterConfig from '../config/filter.config';
import getFilterStructureMap from '../configHelpers/filterConfigResolver'
import getBoxesIdMappedByFilterStatus from './filter';
import getOrderedBoxIdList from './order';
import getPaginatedBoxList from './pagination';
import getFiltersStatistics from './filterStatistic';
let lastRequestData = {};

const perPage = 10;

self.onMessage = async (event) => {
    const 
        requestData = event.data,
        { filtersApplied, orderBy, page, universe } = requestData,
        filterConfigForUniverse = filterConfig[universe];

    const filterStructureMap = await getFilterStructureMap(universe, filterConfigForUniverse);

    const 
        boxesIdMappedByFilteredStatus = await getBoxesIdMappedByFilterStatus(requestData, filterStructureMap),
        orderedBoxIdList = await getOrderedBoxIdList(requestData, boxesIdMappedByFilteredStatus.get(true)),
        paginatedBoxList = await getPaginatedBoxList(requestData, perPage, orderedBoxIdList);
    self.postMessage({ type: 'BOX_LIST', boxList: paginatedBoxList });
        

    const filtersStatisticsByFilter = await getFiltersStatistics(requestData, filterStructureMap, boxesIdMappedByFilteredStatus);
    self.postMessage({ type: 'FILTERS_STATISTICS', filtersStatisticsByFilter });
};


const onFilterChanged = (requestData) => {

}

const onOrderChanged = async () => {
   
}



const _getFilterItemsStatisticMap = async () => {

};









