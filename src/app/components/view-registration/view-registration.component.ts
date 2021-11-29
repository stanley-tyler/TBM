import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BikeService } from "../../services/bike.service";
import { ActivatedRoute } from "@angular/router";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.scss']
})
export class ViewRegistrationComponent implements OnInit {

  public bikeReg: any;
  constructor(private bikeService: BikeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBikeReg(this.route.snapshot.params['id']);
  }

  getBikeReg(id: number)
  {
    this.bikeService.getBike(id).subscribe({

      next: (data) => this.bikeReg = data,
      error: (e) => console.error(e),
      complete: () => console.log('bike loaded')
    })
  }
  
  updateBike(event: any, inputName: string) {
    switch (inputName) {
        case "name":
        this.bikeReg.name = event.target.value;
        break;
        case "email":
        this.bikeReg.email = event.target.value;
        break;
        case "phone":
        this.bikeReg.phone = event.target.value;
        break;
        case "model":
        this.bikeReg.model = event.target.value;
        break;
        case "serialNumber":
        this.bikeReg.serialNumber = event.target.value;
        break;
        case "purchasePrice":
        this.bikeReg.purchasePrice = event.target.value;
        break;
        case "purchaseDate":
        this.bikeReg.purchaseDate = event.target.value;
        break;
      default:
        break;
    }
  }
  updateRegistration() {

    this.bikeService.updateBikeRegistration(this.bikeReg).subscribe({
      next: (n) => { console.log(n)},
      error: (e) => throwError(() => new Error(e))
    });  
  }  

}
