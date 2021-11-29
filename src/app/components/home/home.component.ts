import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { BikeService } from "../../services/bike.service";
import { AdminComponent } from "../admin/admin.component";
import { NgbModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  models: string[] = [
    'MTB 29 Full Suspension',
    'Carbon Fiber Race Series',
    'Time Trial Blade',
  ];
  data: any;
  validMessage: string = "";
  bikeForm = new FormGroup({
    name :  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email :  new FormControl('', [Validators.required, Validators.email]),
    phone : new FormControl('', Validators.required),
    model : new FormControl('', Validators.required),
    serialNumber : new FormControl('', Validators.required),
    purchasePrice : new FormControl('', Validators.required),
    purchaseDate : new FormControl('', Validators.required),
    contactFormControl : new FormControl()  
  })
  /* name =  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  email =  new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', Validators.required);
  model = new FormControl('', Validators.required);
  serialNumber = new FormControl('', Validators.required);
  purchasePrice = new FormControl('', Validators.required);
  purchaseDate = new FormControl('', Validators.required);
  contactFormControl = new FormControl(); */

  matcher = new MyErrorStateMatcher();
  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  submitRegistration(formDirective:FormGroupDirective) {
    if (this.bikeForm.valid) {
      this.bikeService.getBikes().subscribe({
        next: (n) => {
          this.bikeService.createBikeRegistration(this.bikeForm.value, n).subscribe({
            next: () => {          
              return true;
            },
            error: (e) => throwError(() => new Error(e)),
            complete: () => {
              formDirective.resetForm();
              this.bikeForm.reset();
            }
          })
        }
      })
      this.validMessage = "Your bike registration has been submitted. Thank you";
      
      
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }

}
