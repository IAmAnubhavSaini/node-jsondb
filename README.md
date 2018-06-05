# JSONDB

DB implementation via JSON files.

```javacsript

	const { Document } = require('@f0c1s/jsondb')
	const doc = new Document('data.json')

	const data = {
		type: 'type',
		data: [1, 3, 5, 7, 9]
	}

	doc.write(data)

	const readData = doc.read()

	assert.deepEqual(data, readData) // true

```

## LICENSE

MIT &copy; Anubhav Saini 2018 @sainianubhav
