
jest.genMockFromModule('../webWorkers');

class WebWorkerMock {
    postMessage(requestData) {
        const responseData = {
            data: {
                type: 'BOX_LIST',
                boxList: myBoxList
            }
        };
        this.onmessage(responseData);
    }
    onmessage() {}
    onerror() {}
};

export
const getFetchBoxListWebWorker = () => new WebWorkerMock();
