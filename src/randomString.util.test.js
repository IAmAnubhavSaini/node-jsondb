const { randomString } = require("./randomString.util");

describe("randomString", () => {
    it("generates a string", () => {
        const out = randomString(10);
        const expected = "string";
        const actual = typeof out;
        expect(actual).toEqual(expected);
    });
    it("generates random strings", () => {
        const list = Array(100)
            .fill(0)
            .map((_, i) => randomString(10));
        const set = new Set();
        list.forEach((li) => set.add(li));
        const expected = true; // 100 === 100
        const actual = list.length === set.size;
        expect(actual).toEqual(expected);
        expect(list.length).toEqual(100);
        expect(set.size).toEqual(100);
    });
});
