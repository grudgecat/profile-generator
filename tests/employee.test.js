const { it, expect } = require('@jest/globals');
const Employee = require('../lib/employee.js');

describe('Test Employee class constructor', () => {
    describe('test setters', () => {
        it('name', () => {
            const employee = new Employee('John');
            expect(employee.name).toEqual('John');
        })
        it('id', () => {
            const employee = new Employee('Chris', '1');
            expect(employee.id).toEqual('1');
        })
        it('email', () => {
            const employee = new Employee('Archie', '2', 'myaddy@gmail.com');
            expect(employee.email).toEqual('myaddy@gmail.com');
        })
    })
    describe('test getters', () => {
        it('getName', () => {
            const employee = new Employee('John');
            expect(employee.getName()).toEqual('John');
        })
        it('getId', () => {
            const employee = new Employee('Chris', '1');
            expect(employee.getId()).toEqual('1');
        })
        it('getEmail', () => {
            const employee = new Employee('Archie', '2', 'myaddy@gmail.com');
            expect(employee.getEmail()).toEqual('myaddy@gmail.com');
        })
        it('getRole', () => {
            const employee = new Employee('John');
            expect(employee.getRole()).toEqual('Employee');
        })
    })
})