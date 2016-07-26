# Monoture
Monoture is a simple blogging application for Node.js. Easy to extend for developers and even easier to use for writers.

## Features
* Easily access content via a built in API
* Build custom templates, themes and components using [Pug](https://github.com/pugjs/pug) and [Express.js](https://github.com/expressjs/express)
* Write content in [Markdown](http://daringfireball.net/projects/markdown/syntax) and view changes in real time
* Manage the site through the command line
* Content is stored on-disk using [NeDB](https://github.com/louischatriot/nedb) (a lightweight document database)

# Installation
```
$ npm install monoture --save
```

# Getting Started
Monoture ships with an installation script that will set the project up;

```
$ monoture install
```

The script will create a few directories, a standard `env.js` environment file and register an admin user with a randomised password. Users can be added, updated and deleted via the command line (see below).

Monoture can also be started using the command line;

```
$ monoture run
```

By default this will start Monoture on `http://localhost:3000`. The dashboard can be accessed at `http://localhost:3000/dashboard/`.

# Command line
## `monoture run`
Starts an instance of the Monoture application. Handy if you're not directly accessing the internal API.

## `monoture install`
Installs Monoture onto the parent package by creating folders, default configuration and users.

## `monoture user-list`
Lists all registered user accounts.

## `monoture user-add [username] [password]`
Creates a new user with the provided username and password.

## `monoture user-delete [username]`
Deletes a user.

## `monoture user-pass [username] [password]`
Updates the specified user with a new password.

# API
Monoture exposes all the content via an external RESTful API. This is protected by a bearer token which can only be obtained after successful login.

Currently only the `Post` model is presented by the API;

#### Retrieve all posts
`GET     /v1/posts`

#### Create a new post
`POST    /v1/posts`

#### Update an existing post
`PUT     /v1/posts/:post`

#### Delete a post
`DELETE  /v1/posts/:post`

Monoture also provides an internal API that allows developers to implement custom functionality and themes;

## `setTheme(package)`
Allows a custom theme to be passed through and bound to the underlying Express.js application.

## `run()`
Starts Monoture, similar to running `monoture run` from the command line.

# Theming
Monoture uses [Pug](https://github.com/pugjs/pug) by default for page layouts and theming. Monoture is configured with multiple `view` and `public` directories, which allows templates to be easily extended and overwritten.

Monoture will always check the main package first, and then fallback to the theme directories.

Typically a theme must implement a main home page and a post page. See [monoture-theme](https://github.com/monoture/monoture-theme) for reference.

# Screenshots
## Dashboard
![dashboard](https://cloud.githubusercontent.com/assets/894505/17153327/130bd188-5374-11e6-9d97-22c5c1342cee.png)
## Editor
![editor](https://cloud.githubusercontent.com/assets/894505/17153329/15bbf782-5374-11e6-8e62-21796aa20539.png)

# Known issues
* Windows 10 users may need to install Microsoft Visual C++ Build Tools in order to run node-gyp
