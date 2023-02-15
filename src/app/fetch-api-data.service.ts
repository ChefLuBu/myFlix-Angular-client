import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-xfet.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class
  // making it available via this.http
  
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint

  /**
   * @service POST to he user endpoint
   * @param userDetails 
   * @returns A JSON object with the user's day
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

/**
 * User login 
 * @service POST - login endpoint
 * @param userDetails 
 * @returns A JSON object of the logged-in user's data
 * @functon userLogin
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
/**
 * @service GET all movies - movies endpoint
 * @returns  A JSON obect with all movie data
 * @function getAllMovies
 */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    //requires the token to get all movies, pulls from local 
    //storage after login
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @GET a single movie from the movies endpoint
   * @param title 
   * @returns a JSON object containing data about selected movie
   * @fusnction getMovie
   */

//Title, Director name, Genre are all strings
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("token check", token)
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET data about a director from the database and display block
   * @param directorName 
   * @returns a JSON object containing director data
   * @function getDirector
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service get data about genre by name from the database
   * @param genreName 
   * @returns a JSON object holding the name & genre of a movie
   * @function getGenre
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get user
   * @service GET user data by name from username endpoint
   * @returns  a JSON object containing user's data
   * @function getUser
   */

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    //get from local storage return from db
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

/***
 * @service POST a movie to user's favorite movies array
 * @param movieId
 * @returns a JSON object containing the updated array data
 * @function addFavoriteMovie
 */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`,{}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

/**
 * @service DELETE's favorite movie from user data array
 * @param movieId 
 * @returns a JSON object containing updated user array 
 * @function removeFavoriteMovie
 */

  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service PUT request that updates user data 
   * @param updatedUser 
   * @returns a JSON object with updated data
   * @function updateUser
   */

  updateUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
/**
 * @service Deteles user
 * @returns  a message upon successful deletetion
 * @function deleteUser
 */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Extracts respons data from the HTTP response
   * @param res 
   * @returns the response body or empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles API call errors
   * @param error 
   * @returns error message
   * @function handleError
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

