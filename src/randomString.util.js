const randomHexString = require("@f0c1s/random-hex-strings").default;

function randomString(length = 10) {
    return randomHexString(length);
}

module.exports = {
    randomString,
};
