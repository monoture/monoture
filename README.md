# monoture
Node.js Content Platform

# Collaboration Notes
## Requirements
* Node v5.2.0+
* Python 2.6 (for node-gyp)
* [Microsoft Visual C++ Build Tools](https://www.microsoft.com/en-us/download/confirmation.aspx?id=49983) (for node-gyp)

## How to run Monoture
1. Checkout [Monoture](https://github.com/jamespegg/monoture)
2. Checkout [Monoture Theme](https://github.com/jamespegg/monoture-theme)
3. Run `npm link` on both local checkouts
4. Run `npm link monoture-theme` on the main Monoture checkouts
5. Create a sample website directory, and run `npm init`
6. Run `npm link monoture` to install your local version of Monoture
7. Run `monoture install` to run the install scripts
8. Take note of the admin password, this is randomly generated
9. Run `monoture run` to run the application
10. Access Monoture on `http://localhost:3000`
11. Access the Monoture admin dashboard on `http://localhost:3000/monoture/`
12. 

# Screenshots
## Dashboard
![dashboard](https://cloud.githubusercontent.com/assets/894505/15801760/1c990384-2a97-11e6-9765-1dd5bef9c6d5.png)
## Editor
![editor](https://cloud.githubusercontent.com/assets/894505/15801761/1c9d5ec0-2a97-11e6-9f8d-f7147d022e85.png)

