const { it, expect } = require('@jest/globals');
const Manager = require('../lib/manager.js');

describe('test manager constructor', () => {
    describe('test setters', () => {
        it('name', () => {
            const manager = new Manager('John');
            expect(manager.name).toBe('John');
        })
        it('id', () => {
            const manager = new Manager('Chris', '1');
            expect(manager.id).toBe('1');
        })
    })
    describe('test getters', () => {
        it('getName', () => {
            const manager = new Manager('John');
            expect(manager.getName()).toBe('John');
        })
    })
})