const fs = require("fs");

class Document {
    constructor(path) {
        this.path = path;
        this.logPath = path + ".log";
        this.keys = [];
        this.meta = [];
        this.store = [];

        /* initialize log first */
        if (!fs.existsSync(this.logPath)) {
            fs.writeFileSync(this.logPath, "", { flag: "wx" });
        }

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, "", { flag: "wx" });
        }
    }

    writeFile(data) {
        fs.appendFileSync(this.logPath, "attempt start: writeFile\n");
        const ks = Object.keys(data);
        this.keys.push(ks);
        const x = JSON.stringify(data);
        fs.writeFileSync(this.path, x);
        fs.appendFileSync(this.logPath, "attempt end: writeFile\n");
    }

    appendFile(data) {
        fs.appendFileSync(this.logPath, "attempt start: appendFile\n");
        const ks = Object.keys(data);
        this.keys.push(ks);
        const x = JSON.stringify(data) + "\n";
        fs.appendFileSync(this.path, x);
        fs.appendFileSync(this.logPath, "attempt end: appendFile\n");
    }

    readFile() {
        fs.appendFileSync(this.logPath, "attempt start: readFile\n");
        const strings = fs.readFileSync(this.path).toString();
        // console.log(strings)
        if (strings.length === 0) {
            return "";
        }
        const lines = strings.split("\n").filter((line) => line.length > 0);
        // console.log(lines)
        fs.appendFileSync(this.logPath, "attempt end: readFile\n");
        return lines.map((line) => {
            // console.log(line)
            return JSON.parse(line);
        });
    }

    deleteByLineNumberOffsetFile(lineNumberOffset) {
        fs.appendFileSync(
            this.logPath,
            "attempt start: deleteByLineNumberOffsetFile\n"
        );
        if (lineNumberOffset < 0) {
            throw new Error("ERROR: cannot be lower than 0");
        }
        const data = this.readFile();
        if (lineNumberOffset >= data.length) {
            throw new Error(
                "ERROR: deleteByLineNumberOffsetFile index higher than last available index"
            );
        }
        const toDelete = data[lineNumberOffset];
        if (lineNumberOffset === 0 && data.length === 1) {
            this.writeFile("");
            return toDelete;
        }
        const newLines = [
            ...data.slice(0, lineNumberOffset),
            ...data.slice(lineNumberOffset),
        ];
        fs.writeFileSync(this.path, "");
        newLines.forEach((line) =>
            fs.appendFileSync(this.path, JSON.stringify(line) + "\n")
        );
        fs.appendFileSync(
            this.logPath,
            "attempt end: deleteByLineNumberOffsetFile\n"
        );
        return toDelete;
    }

    buildKeysFromFile() {
        fs.appendFileSync(this.logPath, "attempt start: buildKeysFromFile\n");
        const data = this.readFile();
        this.keys = data.map((d) => Object.keys(d));
        fs.appendFileSync(this.logPath, "attempt end: buildKeysFromFile\n");
        return this.keys;
    }

    buildMetaFromFile() {
        fs.appendFileSync(this.logPath, "attempt start: buildMetaFromFile\n");
        const data = this.readFile();
        this.meta = {
            total: {
                count: data.length,
                length: JSON.stringify(data).length,
            },
            each: data.map((d) => ({
                length: JSON.stringify(d).length,
            })),
        };
        fs.appendFileSync(this.logPath, "attempt end: buildKeysFromFile\n");
        return this.meta;
    }

    eraseEmptyFile() {
        fs.appendFileSync(this.logPath, "attempt start: eraseEmptyFile\n");
        const data = this.readFile();
        const newData = data.filter((d) => d.length > 0);
        this.writeFile(newData);
        fs.appendFileSync(this.logPath, "attempt end: eraseEmptyFile\n");
    }
}

module.exports = {
    Document,
};
