var Document = require('camo').Document;

class Post extends Document {
    constructor() {
        super();

        this.title = String;
        this.body = String;
        this.description = String;
        this.slug = String;
        this.published = Boolean;
        this.created_at = Date;
        this.updated_at = Date;
        this.featured = Boolean;
    }

    preSave() {
        let now = new Date();
        this.updated_at = now;

        if (!this.created_at) {
          this.created_at = now;
        }

        console.log(this.created_at)
    }
}

module.exports = Post;
