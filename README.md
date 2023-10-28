# React Todo List Application

## What is been used in this repository

This project is a React Todo List Application

1. Creating a Components in React
2. Saving todo in localStorage
3. Handling CRUD operations of each Todos
4. Generating List of Todo
5. Light and Dark mode UI with basic CSS
6. Searching a specific todo with search box
7. Having a category filter to categorize nad view the list of todos with specific category
8. Unit Tests for the main App component

## Live Application URL

### https://react-ts-todo-tau.vercel.app

This URL has the application deployed in Vercel as per instructions

## Prerequisites

### create a react application using npx create-react-app -my-todo --template-typescript

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npx create-react-app my-app --template typescript
```

## Live Application URL

The Project is deployed in https://github.com/Adithyavarun-creator/react-ts-todo

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

1. **Navbar** Component : This Component supports only for light and dark mode feature for the whole application and the mode features are simplified with CSS

2. **App** Component : This is the main Component that handles all CRUD operations of a Todo.Each of the CRUD oeprations are commented with desired for which is performing the create/read/update/delete operations. Each todoes when they are created are saved in your browser's localStorage for saving your datas quickly instead of saving in an external backend server, the only thing to do while fetching is to parse and stringify the data that is stored in localeStorage. There is a form to evaluate the inputs are been filled and not filled while submitting . The errors and success messages are showed in a toast message at center of the webpage once submitted or updated.

3. **Footer** Component : This Component contains an top arrow icon in the bottom to scroll at top of the page when you have more or multipls todo list

#### Routes

The application does not have a react-router-dom routing as this is a simple basic CRUD operations with localeStorage

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

## Unit Testing

There are 6 testing features in which 3 worked out well and rest had some typescript errors for getbytestid but in normal react jsx it worked perfectly but in react tsx it was not running it successfully so I have commented it in App.test.tsx file
