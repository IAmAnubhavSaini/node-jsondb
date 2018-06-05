const { Document } = require('./Document')
const assert = require('assert')

/* global describe it */

describe('Document', () => {
    it('is a class', () => {
        const actual = typeof Document
        const expected = typeof function x() { }
        assert.equal(actual, expected)
    })

    it('has write method of arity 1', () => {
        const d = new Document('x')
        const actual = { type: typeof d.write, arity: d.write.length }
        const expected = { type: 'function', arity: 1 }
        assert.deepEqual(actual, expected)
    })

    it('has read method of arity 0', () => {
        const d = new Document('x')
        const actual = { type: typeof d.read, arity: d.read.length }
        const expected = { type: 'function', arity: 0 }
        assert.deepEqual(actual, expected)
    })

    it('has path property same as provided to constructor', () => {
        const d = new Document('x')
        const actual = { type: typeof d.path, value: d.path }
        const expected = { type: 'string', value: 'x' }
        assert.deepEqual(actual, expected)
    })
})
