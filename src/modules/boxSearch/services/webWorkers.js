// @flow

import Worker from '../controllers/worker.js';

let fetchBoxListWebWorker;

export
const getFetchBoxListWebWorker = () => {
    fetchBoxListWebWorker = fetchBoxListWebWorker || new Worker();
    return fetchBoxListWebWorker;
}
