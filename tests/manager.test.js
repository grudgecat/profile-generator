const { it, expect } = require('@jest/globals');
const Manager = require('../lib/manager.js');

describe('Test Manager class constructor', () => {
    describe('test setters', () => {
        it('name', () => {
            const manager = new Manager('John');
            expect(manager.name).toEqual('John');
        })
        it('id', () => {
            const manager = new Manager('Chris', '1');
            expect(manager.id).toEqual('1');
        })
        it('email', () => {
            const manager = new Manager('Archie', '2', 'myaddy@gmail.com');
            expect(manager.email).toEqual('myaddy@gmail.com');
        })
        it('officeNumber', () => {
            const manager = new Manager('Veronica', '3', 'veronica@aol.com', '425-687-5309');
            expect(manager.officeNumber).toEqual('425-687-5309');
        })
    })
    describe('test getters', () => {
        it('getName', () => {
            const manager = new Manager('John');
            expect(manager.getName()).toEqual('John');
        })
        it('getId', () => {
            const manager = new Manager('Chris', '1');
            expect(manager.getId()).toEqual('1');
        })
        it('getEmail', () => {
            const manager = new Manager('Archie', '2', 'myaddy@gmail.com');
            expect(manager.getEmail()).toEqual('myaddy@gmail.com');
        })
        it('getOfficeNumber', () => {
            const manager = new Manager('Veronica', '3', 'veronica@aol.com', '555-867-5309');
            expect(manager.getOfficeNumber()).toEqual('555-867-5309');
        })
        it('getRole', () => {
            const manager = new Manager('John');
            expect(manager.getRole()).toEqual('Manager');
        })
    })
})