import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'ZTVt2XFKXuUmHd7iWbu8i3NFqSB40tJA',
    domain: 'dev-974x9edi.us.auth0.com',
    responseType: 'token id_token',
    audience: 'https://desolate-shelf-59896.herokuapp.com',
    redirectUri: 'https://stanley-tyler.github.io/TBM/callback',
    scope: 'openid view:registration view:registrations'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {;
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/admin']);
      } else if (err) {
        this.router.navigate(['/admin']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    var expires_at = localStorage.getItem('expires_at')
    if (expires_at == null) {
        expires_at = "0";
    }
    const expiresAt = JSON.parse(expires_at);
    return new Date().getTime() < expiresAt;
  }

}