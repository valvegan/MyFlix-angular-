# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Setting up the development environment
1) Make sure the latest version of angular is installed (this project is using version 13.3.7)
>npm install -g @angular/cli@latest
2) create a new application 
>ng new myFlix-Angular-client
3) Run the app 
>ng serve --open
4) Create a new angular service to be able to load data from an api 
>ng generate service fetch-api-data 

## User stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features
- A welcome view, where users will be able to either log in or register an account.
- A registration page
- A login page
- A movie view, where users can view all movies after being authenticated
- Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
