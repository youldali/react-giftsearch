// @flow

import Worker from '../controllers/main.worker.js';

let fetchBoxListWebWorker;

export
const getFetchBoxListWebWorker = () => {
    fetchBoxListWebWorker = fetchBoxListWebWorker || new Worker();
    return fetchBoxListWebWorker;
}
