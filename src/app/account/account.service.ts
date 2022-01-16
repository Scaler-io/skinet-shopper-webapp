import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = env.skinetCatalogApiBaseV2;
  private currentUserSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(1); 
  currentUser$: Observable<IUser> = this.currentUserSource.asObservable(); 


  constructor(private http: HttpClient,
    private router: Router) { }

 
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}account/IsEmailTaken?email=${email}`);
  }
  
  loadCurrentUser(token: string): Observable<void> {
    if(token === null){
      this.currentUserSource.next(null);
      return of(null);
    }

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

  getUserAddress(): Observable<IAddress>{
    return this.http.get<IAddress>(`${this.baseUrl}account/address`);
  }

  updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(`${this.baseUrl}account/address`, address);
  }
}
