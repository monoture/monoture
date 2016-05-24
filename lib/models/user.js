var Document = require('camo').Document;

class User extends Document {
    constructor() {
        super();

        this.username = String;
        this.password = String;
    }
}

module.exports = User;
