# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

MyFlix is a small app that showcases various informations from a small database (REST API) of movies. Users can register, update/add information about themselves (securely via password hashing) and add/remove movie titles to a list of their favourites. 

The client-side for myFlix is developed using ANGULAR, HTML5, and SCSS

The server-side development for myFlix can be accessed [here](https://github.com/valvegan/movie_api)

## A live preview of the app can be accessed [here](link )

## Prerequisites
- Node and latest version of npm

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

## App Features
- A welcome view, where users will be able to either log in or register an account.
- A registration page
- A login page
- A movie view, where users can view all movies after being authenticated
- Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Personal reflections on the project
