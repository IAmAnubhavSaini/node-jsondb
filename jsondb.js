const fs = require('fs')

const write = (filename, data) => {
	const x = JSON.stringify(data)
	fs.writeFileSync(filename, x)
}

const read = filename => {
	return JSON.parse(fs.readFileSync(filename))
}

module.exports = {
	write,
	read
}

