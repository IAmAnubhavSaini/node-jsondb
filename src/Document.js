const fs = require('fs')

class Document {
    constructor(path) {
        this.path = path
        this.logPath = path + '.log'
        this.keys = []
        this.meta = []
        this.store = []

        /* initialize log first */
        if (!fs.existsSync(this.logPath)) {
            fs.writeFileSync(this.logPath, '', {flag: 'wx'})
        }

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '', {flag: 'wx'})
        } else {
            this.store = this.readFile()
            this.buildKeysFromFile()
            this.buildMetaFromFile()
        }
    }

    writeFile(data) {
        fs.appendFileSync(this.logPath, 'attempt start: writeFile')
        const ks = Object.keys(data)
        this.keys.push(ks)
        const x = JSON.stringify(data)
        fs.writeFileSync(this.path, x)
        fs.appendFileSync(this.logPath, 'attempt end: writeFile')
    }

    appendFile(data) {
        fs.appendFileSync(this.logPath, 'attempt start: appendFile')
        const ks = Object.keys(data)
        this.keys.push(ks)
        const x = JSON.stringify(data) + '\n'
        fs.appendFileSync(this.path, x)
        fs.appendFileSync(this.logPath, 'attempt end: appendFile')
    }

    readFile() {
        fs.appendFileSync(this.logPath, 'attempt start: readFile')
        const strings = fs.readFileSync(this.path).toString()
        // console.log(strings)
        if (strings.length === 0) {
            return ''
        }
        const lines = strings.split('\n').filter(line => line.length > 0)
        // console.log(lines)
        fs.appendFileSync(this.logPath, 'attempt end: readFile')
        return lines.map(line => {
            // console.log(line)
            return JSON.parse(line)
        })
    }

    deleteByLineNumberOffsetFile(lineNumberOffset) {
        fs.appendFileSync(this.logPath, 'attempt start: deleteByLineNumberOffsetFile')
        if (lineNumberOffset < 0) {
            throw new Error('ERROR: cannot be lower than 0')
        }
        const data = this.readFile()
        if (lineNumberOffset >= data.length) {
            throw new Error('ERROR: deleteByLineNumberOffsetFile index higher than last available index')
        }
        const toDelete = data[lineNumberOffset]
        if (lineNumberOffset === 0 && data.length === 1) {
            this.writeFile('')
            return toDelete
        }
        const newLines = [...data.slice(0, lineNumberOffset),
            ...data.slice(lineNumberOffset)]
        fs.writeFileSync(this.path, '')
        newLines.forEach(line => fs.appendFileSync(this.path, JSON.stringify(line) + '\n'))
        fs.appendFileSync(this.logPath, 'attempt end: deleteByLineNumberOffsetFile')
        return toDelete
    }

    buildKeysFromFile() {
        fs.appendFileSync(this.logPath, 'attempt start: buildKeysFromFile')
        const data = this.readFile()
        this.keys = data.map(d => Object.keys(d))
        fs.appendFileSync(this.logPath, 'attempt end: buildKeysFromFile')
        return this.keys
    }

    buildMetaFromFile() {
        fs.appendFileSync(this.logPath, 'attempt start: buildMetaFromFile')
        const data = this.readFile()
        this.meta = {
            total: {
                count: data.length, length: JSON.stringify(data).length
            }, each: data.map(d => ({
                length: JSON.stringify(d).length
            }))
        }
        fs.appendFileSync(this.logPath, 'attempt end: buildKeysFromFile')
        return this.meta
    }

    eraseEmptyFile() {
        fs.appendFileSync(this.logPath, 'attempt start: eraseEmptyFile')
        const data = this.readFile()
        const newData = data.filter(d => d.length > 0)
        this.writeFile(newData)
        fs.appendFileSync(this.logPath, 'attempt end: eraseEmptyFile')
    }
}

module.exports = {
    Document
}
