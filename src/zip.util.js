function zip(...lists) {
    const minLength = lists.reduce(
        (min, list) => (min <= list.length ? min : list.length),
        Infinity
    );
    return Array(minLength)
        .fill(0)
        .map((_, i) => lists.map((l) => l[i]));
}

module.exports = {
    zip,
};
