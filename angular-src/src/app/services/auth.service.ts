import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: Http,
  ) { }

  // Get User Profile
  getUserProfile() {
    // Refresh Token
    this.loadToken();
    const head = new Headers();
    head.append('Authorization', this.authToken);
    head.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: head })
            .map((res) => res.json());
  }

  // Register User
  registerUser(user) {
    const head = new Headers();
    head.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: head })
            .map((res) => res.json());
  }

  // Login User
  loginUser(user) {
    const head = new Headers();
    head.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: head })
            .map((res) => res.json());
  }

  // Store session token
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Load Token
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Check if logged in
  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
