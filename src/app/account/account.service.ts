import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = env.skinetCatalogApiBaseV2;
  private currentUserSource: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null); 
  currentUser$: Observable<IUser> = this.currentUserSource.asObservable(); 


  constructor(private http: HttpClient,
    private router: Router) { }

  getCurrentUserValue(): IUser {
    return this.currentUserSource.value;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}account/IsEmailTaken?email=${email}`);
  }
  
  loadCurrentUser(token: string): Observable<void> {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}account`, {headers}).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  login(value: any): Observable<void>{
    return this.http.post(`${this.baseUrl}account/signin`, value).pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  
  register(value: any): Observable<void> {
    return this.http.post(`${this.baseUrl}account/signup`, value).pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }  
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
