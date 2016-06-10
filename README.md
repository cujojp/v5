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
### Setting up Dokku with host.

Make sure to install the dokku server via digialocean or whichever host you have. If you’re using a DNS registry you will need to update the A Name and IP which the DNS will point to. This should be pointing to the digital ocean IP.

In our case, this  is just an example the IP is: `198.199.98.242`.

### Pushing Worker’s to dokku
Pushing to dokku is simple! You will however need to run a couple steps to deploy to the VPS and Dokku. 
 

1. Add a git remote 
cd into the project root directory.
$ cd v5

Add a git remote to our VPS with the Application name
$ git remote add dokku dokku@*atarashi.cujo.jp:atarashi*

2. Deploy the application! -- easy as one two three! (four)
$ git push dokku master



### Setting up your SSH Keys

sh cat ~/.ssh/id_rsa.pub | ssh root@atarashi.cujo.jp "sudo sshcommand acl-add dokku atarashi” 

User: root@atarashi.cujo.jp
<<<<<<< HEAD
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
### Setting up Dokku with host.

Make sure to install the dokku server via digialocean or whichever host you have. If you’re using a DNS registry you will need to update the A Name and IP which the DNS will point to. This should be pointing to the digital ocean IP.

In our case, this  is just an example the IP is: `198.199.98.242`.

### Pushing Worker’s to dokku
Pushing to dokku is simple! You will however need to run a couple steps to deploy to the VPS and Dokku. 
 

1. Add a git remote 
cd into the project root directory.
$ cd v5

Add a git remote to our VPS with the Application name
$ git remote add dokku dokku@*atarashi.cujo.jp:atarashi*

2. Deploy the application! -- easy as one two three! (four)
$ git push dokku master



### Setting up your SSH Keys

sh cat ~/.ssh/id_rsa.pub | ssh root@atarashi.cujo.jp "sudo sshcommand acl-add dokku atarashi” 

User: root@atarashi.cujo.jp
Password: #teehee

### Sync your git account with your Dokku VPS for easy deployments 

```
sh git remote add dokku root@atarashi.cujo.jp:v5
```

### Deploy to Dokku

```
sh git push dokku master
```

*Oh no I get the following error!*
```
fatal: 'atarashi' does not appear to be a git repository
fatal: Could not read from remote repository.
```

ssh into the server. 

	1.	Login to server as root. cd ~ (Go to home dir of root)
	2.	cd v5
	3.	git init --bare (It should give you message that it initialized a git repo)



## SSH Into the VPS

TODO: Setup Dokku


## Running the Application
- - - - - -

**1. Start Gulp**

Recently added to the stack has been [gulp.js](http://nodejs.org/). This will watch for file changes and compile using something similar to sprockets and compile and also minify the js file into an all.js directory. If in development, run gulp.js when making changes to any javascript files, so it can recompile the changes. 

Run the following command from the project root.

`sh gulp` 

Gulp will run a `startExpress` method which will start express. You can access the server at localhost:5000




