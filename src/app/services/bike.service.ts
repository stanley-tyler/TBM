import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpOptionsToken = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')})
};

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http:HttpClient, private router:Router) { }

  getBikes() {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/v1/bikes',
    {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)})
  }

  getBike(id: number){
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/v1/bikes/' + id,
    {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)})
  }

  createBikeRegistration(bike : any, n: any) {
    var date = bike.purchaseDate.month + "-" + bike.purchaseDate.day + "-" + bike.purchaseDate.year;
    bike.purchaseDate = date;
    let body = JSON.stringify(bike);
    return this.http.post('/server/api/v1/bikes', body, httpOptions);
  }

  updateBikeRegistration(bike: any) {
    let token = localStorage.getItem('access_token');
    let body = JSON.stringify(bike);
    return this.http.put('/server/api/v1/bikes/' + bike.id, body, httpOptions)
  }

  deleteBike(id: number){
    let token = localStorage.getItem('access_token');
    return this.http.delete('/server/api/v1/bikes/' + id, httpOptionsToken)
  }
}
