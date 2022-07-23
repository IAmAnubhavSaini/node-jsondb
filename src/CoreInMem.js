const { jsonStore, justJson } = require("./json");

class CoreInMem {
    constructor() {
        this.store = [];
        this.size = 0;
        this.cumulativeKeySet = new Set();
        this.cumulativeContentLength = 0;
    }

    add(dataObject) {
        this.size++;
        this.store.push(this.preprocess(dataObject));
    }

    deleteByOffset(offset) {
        this.store = [
            ...this.store.slice(0, offset),
            ...this.store.slice(offset + 1),
        ];
    }

    updateOnOffset(offset, dataObject) {
        this.store = [
            ...this.store.slice(0, offset),
            this.preprocess(dataObject),
            ...this.store.slice(offset + 1),
        ];
    }

    fetchJSON() {
        return this.store.map(justJson).map((json) => JSON.parse(json));
    }

    preprocess(dataObject) {
        const keys = Object.keys(dataObject);
        keys.forEach((key) => this.cumulativeKeySet.add(key));
        const json = jsonStore(dataObject);
        this.cumulativeContentLength += json.contentLength;
        return json;
    }
}

module.exports = {
    CoreInMem,
};
