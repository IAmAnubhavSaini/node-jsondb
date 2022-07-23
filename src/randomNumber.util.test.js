const { randomNumber } = require("./randomNumber.util");

describe("randomNumber", () => {
    it("generates a random number", () => {
        const out = randomNumber(10000);
        const expected = "number";
        const actual = typeof out;
        expect(actual).toEqual(expected);
    });
    it("generates random numbers", () => {
        const list = Array(100)
            .fill(0)
            .map((_, i) => randomNumber(100000000));
        const set = new Set();
        list.forEach((li) => set.add(li));
        const expected = true; // 100 === 100
        const actual = list.length === set.size;
        expect(actual).toEqual(expected);
        expect(list.length).toEqual(100);
        expect(set.size).toEqual(100);
    });
});
