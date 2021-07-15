const { it, expect } = require('@jest/globals');
const Engineer = require('../lib/engineer.js');

describe('Test Engineer class constructor', () => {
    describe('test setters', () => {
        it('name', () => {
            const engineer = new Engineer('John');
            expect(engineer.name).toEqual('John');
        })
        it('id', () => {
            const engineer = new Engineer('Chris', '1');
            expect(engineer.id).toEqual('1');
        })
        it('email', () => {
            const engineer = new Engineer('Archie', '2', 'myaddy@gmail.com');
            expect(engineer.email).toEqual('myaddy@gmail.com');
        })
        it('github', () => {
            const engineer = new Engineer('Veronica', '3', 'veronica@aol.com', 'harpo');
            expect(engineer.github).toEqual('harpo');
        })
    })
    describe('test getters', () => {
        it('getName', () => {
            const engineer = new Engineer('John');
            expect(engineer.getName()).toEqual('John');
        })
        it('getId', () => {
            const engineer = new Engineer('Chris', '1');
            expect(engineer.getId()).toEqual('1');
        })
        it('getEmail', () => {
            const engineer = new Engineer('Archie', '2', 'myaddy@gmail.com');
            expect(engineer.getEmail()).toEqual('myaddy@gmail.com');
        })
        it('getOfficeNumber', () => {
            const engineer = new Engineer('Veronica', '3', 'veronica@aol.com', 'harpo');
            expect(engineer.getGitHub()).toEqual('harpo');
        })
        it('getRole', () => {
            const engineer = new Engineer('John');
            expect(engineer.getRole()).toEqual('Engineer');
        })
    })
})