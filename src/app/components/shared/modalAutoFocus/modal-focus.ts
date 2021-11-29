import {Component, Input, TemplateRef, Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">{{name}}</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
    
    @Input() name!: any;
  constructor(public modal: NgbActiveModal) {}
}

@Component({
    selector: 'ngbd-modal-view',
    template: `
    <div class="container">
    <div class="row">
    <button (click)="modal.dismiss()">Back to List</button>
    </div>
    <div>
      <div class="form-group">
        <label>Buyer Name</label>
        <div><input value="{{registration.name}}" (keyup)="table.updateBike($event, 'name')"></div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <div><input value="{{registration.email}}" (keyup)="table.updateBike($event, 'email')"></div>
      </div>
      <div class="form-group">
        <label>Phone</label>
        <div><input value="{{registration.phone}}" (keyup)="table.updateBike($event, 'phone')"></div>
      </div>
      <div class="form-group">
        <label>Bike Model</label>
        <div><input value="{{registration.model}}" (keyup)="table.updateBike($event, 'model')"></div>
      </div>
      <div class="form-group">
        <label>Bike Serial Number</label>
        <div><input value="{{registration.serialNumber}}" (keyup)="table.updateBike($event, 'serialNumber')"></div>
      </div>
      <div class="form-group">
        <label>Purchase Price</label>
        <div><input value="{{registration.purchasePrice}}" (keyup)="table.updateBike($event, 'purchasePrice')" ></div>
      </div>
      <div class="form-group">
        <label>Purchase Date</label>
        <div><input value="{{registration.purchaseDate}}" (keyup)="table.updateBike($event, 'purchaseDate')"></div>
      </div>
    </div>
    <button (click)="modal.close()">Update</button>
  </div>
    `
  })
export class NgbdModalView {
    
    @Input() registration!: any;
    @Input() table!: any;
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: 'modal-focus.html'
})
export class NgbdModalFocus {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
}