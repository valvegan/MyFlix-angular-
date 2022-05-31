import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//declaring the api url that will provide data for the client app
const apiUrl = "https://my-flix-api-2022.herokuapp.com/"
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  //inject the httpclient module to the constructor params
  //this will provide http client to the entire class, making it available via this.http
  constructor(private http: HttpClient){

  }
  //making the api call for the user registration endpoint 
  public userRegistration(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent){
      console.error('Some error occurred:', error.error.message);
    }else{
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later'
    )
  }
}