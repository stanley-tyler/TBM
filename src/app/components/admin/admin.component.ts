import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public bikes: any;
  constructor(private bikeService: BikeService, private router:Router) { }
  
  ngOnInit(): void {
    this.getBikes();   
  }

  getBikes() {
    this.bikeService.getBikes().subscribe({
      next: (data) => this.bikes = data,
      error: (e) => console.error(e),
      complete: () =>  this.router.navigate(['/admin'])
    });
  }

  public filterBy(value: any)
  {
    var bikes : any;
    this.bikeService.getBikes().subscribe({
      next: (data) => bikes = data,
      error: (e) => console.error(e),
      complete: () =>  
      {
        bikes.filter()
      }
    });   
  }

  

  
}
