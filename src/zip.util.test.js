const { zip } = require("./zip.util");

describe("zip", () => {
    it("zips two lists", () => {
        const list1 = [1, 2, 3];
        const list2 = [1, 4, 9];
        const actual = zip(list1, list2);
        const expected = [
            [1, 1],
            [2, 4],
            [3, 9],
        ];
        expect(actual).toEqual(expected);
    });
    it("zips three lists", () => {
        const list1 = [1, 2, 3];
        const list2 = [1, 4, 9];
        const list3 = [1, 8, 27];
        const actual = zip(list1, list2, list3);
        const expected = [
            [1, 1, 1],
            [2, 4, 8],
            [3, 9, 27],
        ];
        expect(actual).toEqual(expected);
    });
    it("zips three lists of different size to shortest list", () => {
        const list1 = [1, 2, 3];
        const list2 = [1, 4, 9, 16, 25];
        const list3 = [1, 8, 27, 81];
        const actual = zip(list1, list2, list3);
        const expected = [
            [1, 1, 1],
            [2, 4, 8],
            [3, 9, 27],
        ];
        expect(actual).toEqual(expected);
    });
});
