var Document = require('camo').Document;

class Post extends Document {
    constructor() {
        super();

        this.title = String;
        this.body = String;
        this.slug = String;
        this.published = Boolean;
    }
}

module.exports = Post;
