const Employee = require('./employee.js');

class Engineere extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return 'Engineer';
    }
    
    getGitHub() {
        return this.github;
    }
}

