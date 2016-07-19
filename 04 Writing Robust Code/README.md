
# Writing Robust Code

In this worksheet you will be introduced to the tools and techniques you will need to successfully complete your work. If you learn and apply these to your assignment you will increase your chances of gaining a much higher grade.

The lab materials are frequently updated to fix bugs and improve your experiences. Before starting any lab you should use the Terminal to navigate to your local repository directory pull any updates from the _upstream remote_.
```
cd 305CDE
git pull upstream
```

## 1 Using a Linter

A **linter** is a program that checks your source code for _programmatic_ and _stylistic_ errors. This will help you to identifying many of the common mistakes that can occur when writing JavaScript code and will ensure the style of your code is consistent.

This is especially important when programming in _JavaScript_ because there are many different programming styles and techniques, many of which can lead to tricky bugs. For this reason there are many different linters that are designed for _JavaScript_, in this module you will learn about one of the more powerful and configurable, called **ESLint**.

EsLint is highly configurable through a hidden config file that needs to be added to the project root directory.

### 1.1 The ESLint Configuration File

Start by ensuring hidden files are displayed in the _Workspace Sidebar_ by clicking on the _gear icon_ and making sure the **Show hidden files** option is checked.

![Showing hidden files](.images/show_hidden.png)

Near the bottom of the file list you should see a file called `.eslintrc`, the initial dot (.) in the filename caused it to be hidden by default.

1. Notice that the file contents are using the _JSON_ format which should be familiar to you.
2. There are two JSON objects, **env** and **rules**.
  1. The **env** object describes the _environment_ you are using. In our example we indicate that we will be using the ECMA6 syntax, are writing _NodeJS_ code, and will be using _Jasmine_ tests.
  2. The **rules** object defines the rules we want to apply. As you can see we are requiring tab indentation, single quotes and avoiding the use of semicolons on each line. The full list of rules can be found in the [ESLint Documentation](http://eslint.org/docs/rules/).
  3. Each rule has a reporting level where 0 means _disabled_, 1 means _warning_ and 2 means _error_. This affects how the rule violations are reported.
  4. Some rules allow for additional options. If these are specified, both the reporting level and options need to be in an array.

### 1.2 ESLint Integration into Cloud9

Cloud9 has support for ESLint embedded in the code editor. Open the `index.js` file and notice the error and warning symbols down the left gutter to the left of the line numbers. If you hover over them you get a description of the problem.

Many ESLint errors relate to whitespace and to identify and fix these it can be useful to show the whitespace characters (spaces, tabs and newlines) in the editor. To enable this in Cloud9:
1. choose **Preferences** from the **Cloud9** menu in the top-left corner.
2. Click on **User Settings** and locate the **Code Editor (Ace)** option within the **Editors** section.
3. Finally enable 'Show Invisible Characters' and close the options panel.

You should now be able to see these in the editor.

#### 1.2.1 Test Your Knowledge

Open the `index.js` file and fix all the _whitespace_ and _indentation_ issues.

### 1.3 Running ESLint From the Terminal

ESLint is available as a NodeJS package which allows you to run it from the terminal. Since there is already support built-in, why would you want to do this?

1. Some editors don't have ESLint support.
2. Running ESLint in the Terminal gives a summary of the linting errors.to check if _all the scripts_ are fixed.
3. It can be configured to fix many of the most common error such as whitespace and semicolon usage.
4. The linting can be run as part of the _Continous Integration_ and _Continous Deployment_ process (more on this in a later worksheet)
5. Finally, it will be used during the marking of your assignment to make sure your code is formatted correctly!

#### 1.3.1 Test Your Knowledge

lets install, configure and run the console-based linter.

1. Start by opening a terminal window and navigating to the `shopping/` directory.
2. Install the NodeJS ESLint package `npm install eslint --save-dev`. This installs it and adds it to your `package.json` file in the `devDependencies` section.
3. Run the executable `node_modules/.bin/eslint .`. This runs the `eslint` executable located in the hidden `.bin/` directory in the `node_modules/` directory.
4. You will see a list of all the errors and warnings found together with a summary with the total number of errors and the total number of warnings.
5. Now run the same command but this time pass the `fix` flag, `node_modules/.bin/eslint --fix .`
6. Open the `index.js` file and notice that most of the issues have gone. The fix tool is not perfect, it may have introduced new errors so use it with caution!

## 2 Project Metadata

Applications written in NodeJS typically contain a file called `package.json` which contains the _metadata_ associated with the project. This includes:

- information about the project such as name, description, keywords and author
- information about the remote repository where the project is hosted
- any modules needed for the project to run (dependencies)
- any modules needed to support development (devDependencies)
- aliases to any useful commands and scripts (scripts)

When you create a new project you should run the `npm init` command to run a wizard. This will build a skeleton `package.json` file for you.

### 2.1 Adding Third-Party Modules

You are already familiar with the process of importing modules into your projects however if you are using a metadata file you need to make sure any modules you import are listed. This is achieved by using _flags_.

- To add a module to the `dependencies` list you need to use the `--save` flag. For example to import the _request_ module and add a reference into your `package.json` file you would run `npm install request --save`.
- To add a module to the `devDependencies` list you use the `--save-dev` flag instead.

Open the `package.json` file and read it carefully.

1. the `scripts` section defines four script shortcuts
2. the `dependencies` section defines the same dependencies as were used in the previous lab
3. the `dev-dependencies` section defines any dependencies required as part of the _development process_

Now install all the dependencies using `npm install`.

### 2.2 Test Your Knowledge

1. modify the `package.json` file and change the version to 1.0.1
2. install the **request** module, making sure it is referenced in the `dependencies` object in your `package.json` file.
3. install the **node-inspector** module, making sure it is referenced in the `devDependencies` object.
4. add a new script alias called `debug` and set its value to `./node_modules/.bin/node-inspector debug.js`, you will be using this later in the worksheet.

## 3 Writing Modular Code

Building robust code is vitally important which means it should be frequently tested against the agreed spec. You will have already been shown the principles of Test-Driven Development (TDD) in the module 205CDE but in this module you will be taking your skills to an entirely new level and building the process into everything you do.

Open the `shopping/` directory and examine the files and directory structure.
```
.
├── debug.js
├── index.js
├── modules
│   └── shopping.js
├── node_modules
├── package.json
└── spec
    └── shopping-spec.js
```
Notice that there is a `modules/` directory. Unit testing is carried out on _units_ of code. In NodeJS we capture functionality in **modules** and these are what we will run the tests on. Each module should be self-contained. _All_ the application _business logic_ should be moved into modules.

### 3.1 NodeJS Modules

Open the `modules/shopping.js` script and read it carefully.

1. Notice that the module imports its own dependencies which will not be visible to other scripts (node-persist in this case).
2. The `exports` object contains the public-facing functionality
  - each object stores an anonymous function which can be called by other parts of our app.
  - each anonymous function is defined using the [ECMA6 Arrow Function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax
  - the functions in some of the properties (count, clear, getAll) take no parameters (indicated by a pair of empty brackets in front of the `=>` arrow)
  - the other functions take a single parameter, listed before the `=>` arrow
3. Some functionality has been completed but there are some [stub functions](https://en.wikipedia.org/wiki/Method_stub) which represent functionality we have not yet implemented.

## 4 Debugging

Sometimes its tricky to locate bugs in your code. Debuggers can help. Once you have identified where the problem may be in your code you place one or more **breakpoints** then run your project in **debug mode**.

As soon as the execution reaches the first _breakpoint_ it will pause and allow you to view the values of all the variables in scope. At this point you can either resume the script or step through the code line by line. To demonstrate this you will be working with a script called `debug.js` which uses our shopping module.

Open the `debug.js` script and study it carefully.

1. Notice that it _imports_ our **shopping** module into an _immutable variable_
  - the relative path needs to be included (its in the `modules` directory)
  - the file extension does not need to be included
2. Any functions in our module that are _exported_ can be accessed through the immutable variable.

Run the script and see what happens.
```
npm run debug
```

### 4.1 Visual Debugger
The first debugger is a visual one built into Cloud9.

### 4.2 Test Your Knowledge

1. Open the `debug.js` script and place a breakpoint on the line `list.add('cheese')` by clicking in the left gutter just to the left of the line number.
2. Use the **Run** button to run the script and open the debugger tools when the script stops on the breakpoint.
3. Add `data` to the _Watch Expressions_.
4. Single-step through the code.
  - start by using the _Step Into_ button to step into the module code
  - once in the module use _Step Over_ to run each line
  - as you step through watch the program flow and contents of the local variables

### 4.3 Node Inspector

An alternative to using the Cloud9 debugger is to use the **Node Inspector** tool. This would normally needs to be installed, however you installed it earlier in the tutorial. It is designed for development on a _local computer_ so you won't be able to complete this section.

To start debugging you need to use Node Inspector to run your script.
```
./node_modules/.bin/node-inspector debug.js
```
If you have completed all the tasks so far in this worksheet you will have set up a _script alias_ in the `package.json` file which means you can run the debugger using `npm run debug` instead.

Now you can open a tab and enter the debug URL of your script. This gives you access to a full visual debugger in a Chrome tab.

### 4.4 Console Debugger
NodeJS also contains a fully [documented](https://nodejs.org/api/debugger.html) debugger controlled from the console (terminal).

### 4.5 Test Your Knowledge

1. Open the `debug.js` file and remove all the breakpoints from the previous exercise.
2. Add a new line just before the `list.add('cheese')` instruction and add the `debugger` command.
3. Run the script using the NodeJS debug sub-command like this `node debug debug.js`, this will run the script in debug mode and pause execution on the first executable line in the script.
4. To see a list of all the commands type `help`.
5. use the `c` command to continue execution until you see the line containing the debugger command you entered.
6. to explore the variables we need to enter **repl** mode then we can run any JavaScript command. Enter `repl`, the cursor will change to `>`.
7. Now print the items in the list using `console.log(list.getAll())`.
8. Press ctrl+C to return to the debugger then the same twice to exit the debugger.


## 5 Documentation

Whenever we write a program it is important that it is fully documented. A simple solution is to add comments to the code which can then be read by anyone who opens the script. A better solution would be to write up detailed _human readable_ documentation.

So what should we be documenting?

1. all function signatures (names, purpose, parameter, return types)
2. any exceptions that may be thrown.
3. an explanation of the purpose of any obscure lines of code

In this exercise you will learn how to use JSDoc to create detailed professional documentation for your code. JSDoc is a markup language used to annotate JavaScript source code files. Using comments containing JSDoc, you can add documentation describing the application programming interface of your code.

JSDoc is available as a NodeJS plugin. It has already been added as a _Dev Dependency_ in the `package.json` file and so it should already be installed. Lets use it to build the documentation for our modules.
```
node_modules/.bin/jsdoc modules/
```
This will create an `out/` directory containing the complete documentation as a website.
```
.
├── fonts
├── index.html  < this is the documentation home page...
├── module-shopping.html
├── scripts
├── shopping.js.html
└── styles
```
Right-click on the `index.html` file and choose _preview_. This will open the home page. The module list can be found down the right-hand side of the screen. Locate the **shopping** link and click to see the full documentation.

1. Notice that each variable and method definition has been lifted from the source code.
2. Notice that each method has a _description_, this was added to the source code file using the special JSDoc markers `/** */`.
3. The `getItem()` method documentation includes a lot more detail, this is defined in _block tags_:
  - a list of the parameters and their types
  - an explanation of the return value and type
  - a list of any exceptions that could be thrown

There are a lot more features that can be added to this, you should take time to read the full [documentation](http://usejsdoc.org) to find out what _block tags_ can be used.

### 5.1 Test Your Knowledge

1. Your challenge is to complete the documentation for the `shopping.js` module. You should use the `getItem()` documentation as a guide.
2. The _Linter_ tool (see section 1) will help you identify where you need to add additional JSDoc comments.
3. To check your results, run the documentation tool and reload the documentation web page.
4. Carefully read through the generated documentation to ensure it is both complete and makes sense.