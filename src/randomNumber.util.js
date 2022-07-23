function randomNumber(max = 1000 * 1000) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    randomNumber,
};
