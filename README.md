# My Kung Fu Flix 

This is the client-side view of a film tracking app, specifically for Kung Fu & Wuxia films,  allowing users to create an account, access information about the genre, director & synopsis different films and save them to a personal list of favorites. Users are able to update their personal information and delete their account if desired. The API for this application can be found on the [movie-api](https://github.com/ChefLuBu/movie_api) repo.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Key Features

* The initial landing page is a Welcome screen that allows new-user registration and login functions
* Upon login authentication, the user is moved to the films view which displays all film cards and an icon showing any favorited films
* film cards contain the following features and information:
  - Genre button: Opens a dialog with details about the genre of that film
  - A "Director" button, opening a dialog with details about the director of that film, including a summary, DOB & DOD where applicable
  - A "Summary" button, opening a dialog with a summary of that film
  - A "Favorite" button, toggling between adding and removing the film to/from favorite list
  - The title and film poster
* The user can navigate to the profile view where they can:
  - Update their profile
  - Delete their account


## Technologies Used

* Angular
* Angular Material
* TypeScript
* TypeDoc
* SASS

## Links
* Live App: https://cheflubu.github.io/myFlix-Angular-client/
* API: https://movie-api-xfet.onrender.com

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
