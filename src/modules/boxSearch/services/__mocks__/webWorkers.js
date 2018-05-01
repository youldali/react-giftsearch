
jest.genMockFromModule('../webWorkers');

export
const myBoxList = [
    {
        id: 100,
        name: 'adrenaline',
        price: 550
    },
    {
        id: 101,
        name: 'sejour in europe',
        price: 100
    },		
];

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
