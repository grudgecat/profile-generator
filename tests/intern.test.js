const { it, expect } = require('@jest/globals');
const Intern = require('../lib/intern.js');

describe('Test Intern class constructor', () => {
    describe('test constructor', () => {
        it('name', () => {
            const intern = new Intern('John');
            expect(intern.name).toEqual('John');
        })
        it('id', () => {
            const intern = new Intern('Chris', '1');
            expect(intern.id).toEqual('1');
        })
        it('email', () => {
            const intern = new Intern('Archie', '2', 'myaddy@gmail.com');
            expect(intern.email).toEqual('myaddy@gmail.com');
        })
        it('school', () => {
            const intern = new Intern('Veronica', '3', 'veronica@uw.edu', 'UW');
            expect(intern.school).toEqual('UW');
        })
    })
    describe('test methods', () => {
        it('getName', () => {
            const intern = new Intern('John');
            expect(intern.getName()).toEqual('John');
        })
        it('getId', () => {
            const intern = new Intern('Chris', '1');
            expect(intern.getId()).toEqual('1');
        })
        it('getEmail', () => {
            const intern = new Intern('Archie', '2', 'myaddy@uw.edu');
            expect(intern.getEmail()).toEqual('myaddy@uw.edu');
        })
        it('getSchool', () => {
            const intern = new Intern('Veronica', '3', 'veronica@aol.com', 'UW');
            expect(intern.getSchool()).toEqual('UW');
        })
        it('getRole', () => {
            const intern = new Intern('John');
            expect(intern.getRole()).toEqual('Intern');
        })
    })
})