# JSONDB

DB implementation via JSON files.

```javacsript

	const jsondb = require('@f0c1s/jsondb')
	
	const data = {
		type: 'type',
		data: [1, 3, 5, 7, 9]
	}

	jsondb.write('data.json', data)

	const readData = jsondb.read('data.json')

	assert.deepEqual(data, readData) // true

```

## LICENSE

MIT &copy; Anubhav Saini 2018 @sainianubhav
