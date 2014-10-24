# v5
- - - - - 

## Development Notes
- - - - - 
### Back End Architecture

**Database Information**

Uses a firebase database. TBD.

**Server Information**

The Server is hosted on digital ocean on an ubuntu VM running on Dokku. To deploy to the database you need admin credentials and Dokku installed and setup on your local machine.


**Front End Architecture**

v5 is build using jade as the express view engine and a number of gulp tasks and helpers. For styling the site uses ruby-sass and compiles into a main.css. 


## Installation 
- - - - - - 

**1. Install Node:**

Go to the node.js site and click the "Install Node" link. [Node.js](http://nodejs.org/).

**2. Install Express**

In your terminal window run the following command:

`sh
npm install express -g
`

You also may need the express generator:

`sh
npm install -g express-generator
`


**3. Install dependencies** 

`sh
npm install
`

**4. Link dependencies**

`sh
npm link
`

Within the console on the project root. Run that command, this will install all the projects dependencies into a /.node_modules directory. 

## Setting up [Dokku](https://github.com/progrium/dokku)
- - - - -

### Setting up your SSH Keys

TODO: Setup Dokku

### Sync your git account with your Dokku VPS for easy deployments 

TODO: Setup Dokku

### Deploy to Dokku

TODO: Add me :)


## SSH Into the VPS

TODO: Setup Dokku


## Running the Application
- - - - - -

**1. Start Gulp**

Recently added to the stack has been [gulp.js](http://nodejs.org/). This will watch for file changes and compile using something similar to sprockets and compile and also minify the js file into an all.js directory. If in development, run gulp.js when making changes to any javascript files, so it can recompile the changes. 

Run the following command from the project root.

`sh gulp` 

Gulp will run a `startExpress` method which will start express. You can access the server at localhost:5000




