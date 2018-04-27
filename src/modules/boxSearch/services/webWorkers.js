// @flow

let fetchBoxListWebWorker;

export
const getFetchBoxListWebWorker = () => {
    fetchBoxListWebWorker = fetchBoxListWebWorker || new Worker('worker.js');
    return fetchBoxListWebWorker;
}
