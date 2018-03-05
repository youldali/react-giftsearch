//@flow

const openDatabase = () => {
    const dbName = "smartbox-gift-search";
    const version = 1;
    const openDBRequest = window.indexedDB.open(dbName, version);

    openDBRequest.onerror = function(event) {
        Promise.reject('error opening DB');
    };

    openDBRequest.onupgradeneeded = function(event) {
        const db = event.target.result;
    };
}

const createStores = (db: IDBDatabase) => {
    

    var objectStore = db.createObjectStore("customers", { keyPath: "id" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    // Use transaction oncomplete to make sure the objectStore creation is 
    // finished before adding data into it.
    objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
        customerData.forEach(function(customer) {
        customerObjectStore.add(customer);
        });
    };
}