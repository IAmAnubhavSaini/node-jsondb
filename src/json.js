function jsonStore(dataObject) {
    const json = JSON.stringify(dataObject);
    return {
        raw: dataObject,
        json: json,
        keys: Object.keys(dataObject),
        contentLength: json.length,
    };
}

function removeRaw(jsonStoreObject) {
    delete jsonStoreObject.raw;
    return jsonStoreObject;
}

function justJson(jsonStoreObject) {
    return jsonStoreObject.json;
}

module.exports = {
    jsonStore,
    removeRaw,
    justJson,
};
