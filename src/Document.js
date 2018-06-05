const fs = require('fs')

class Document {
    constructor(path) {
        this.path = path
    }
    write(data) {
        const x = JSON.stringify(data)
        fs.writeFileSync(this.path, x)
    }
    read() {
        return JSON.parse(fs.readFileSync(this.path))
    }
}

module.exports = {
    Document
}
