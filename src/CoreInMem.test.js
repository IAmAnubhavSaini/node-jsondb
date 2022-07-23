const { CoreInMem } = require("./CoreInMem");
const assert = require("assert");
const { randomNumber } = require("./randomNumber.util");
const { randomString } = require("./randomString.util");
const { zip } = require("./zip.util");

describe("CoreInMem store", () => {
    it("adds and fetches values properly", () => {
        const nums = Array(10)
            .fill(0)
            .map((_) => randomNumber(1000));
        const strs = Array(10)
            .fill(0)
            .map((_) => randomString(10));
        const zipped = zip(nums, strs);
        const store = new CoreInMem();
        zipped.forEach((z) => store.add(z));
        expect(store.size).toEqual(10);
    });
});
