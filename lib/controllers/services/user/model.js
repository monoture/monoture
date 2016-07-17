var Document = require('camo').Document;

class User extends Document {
    constructor() {
        super();

        this.username     = String;
        this.password     = String;
        this.token        = String;
        this.tokenCreated = Date;
    }
}

module.exports = User;
