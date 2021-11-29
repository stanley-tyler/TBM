import {AfterViewInit, Component, Input, SimpleChanges, Type, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AdminComponent } from '../../admin/admin.component';
import { BikeService } from 'src/app/services/bike.service';
import { NgbdModalConfirm, NgbdModalConfirmAutofocus, NgbdModalFocus, NgbdModalView } from "../modalAutoFocus/modal-focus";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus,
  view: NgbdModalView
};
/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample implements AfterViewInit {
    
  displayedColumns: string[] = ['name', 'email', 'purchaseDate', 'purchasePrice', 'delete'];
  public ascendedName : boolean = false;
  public ascendedEmail : boolean = false;
  public bikeReg: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input()
  bikes!: Array<any>;

  @Input()
  admin!: AdminComponent;

  
  dataSource;
  sortedData: any;

  constructor(private bikeService: BikeService, private _modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.bikes);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["bikes"].currentValue != undefined) {
        this.dataSource = new MatTableDataSource<Array<any>>(changes["bikes"].currentValue);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    
  }

  
  openDeleteModal(name: string, row: any)
  {
    const modal = this._modalService.open(MODALS[name], row);
    modal.componentInstance.name = row.name;
    modal.closed.subscribe(() => {
      this.deleteBike(row.id);
      
    })

    modal.dismissed.subscribe(() => {
      console.log("Closed");
    })
  }

  openViewModal(name: string, row: any, table: any)
  {
    this.getBikeReg(row.id);
    const modal = this._modalService.open(MODALS[name]);
    modal.closed.subscribe(() => {
      this.updateRegistration();
      
    })
    modal.componentInstance.registration = row;
    modal.componentInstance.table = table;
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
      error: (e) => window.location.reload(),
      complete: () => window.location.reload()
    });  
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.dataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<Array<any>>(this.sortedData);
    this.dataSource.paginator = this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  public sortAscendName()
  {
    this.dataSource.filteredData = this.dataSource.filteredData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
    this.ascendedName = true;
  }

  public sortDescendName()
  {
    this.bikes = this.bikes.sort((a: any, b: any) => {
      return b.name.localeCompare(a.name);
    });
    this.ascendedName = false;
  }

  public sortName() {
    if(!this.ascendedName)
    {
      this.sortAscendName();
    }
    else {
      this.sortDescendName();
    }
  }

  public sortAscendEmail()
  {
    this.bikes = this.bikes.sort((a: any, b: any) => {
      return a.email.localeCompare(b.email);
    });
    this.ascendedEmail = true;
  }

  public sortDescendEmail()
  {
    this.bikes = this.bikes.sort((a: any, b: any) => {
      return b.email.localeCompare(a.email);
    });
    this.ascendedEmail = false;
  }

  public sortEmail() {
    if(!this.ascendedEmail)
    {
      this.sortAscendEmail();
    }
    else {
      this.sortDescendEmail();
    }
  }

  public deleteBike(id: number) {
    console.log(id);
    this.bikeService.deleteBike(id).subscribe({
      next: (n) => console.log(n),
      error: (e) => console.log(e),
      complete:() => window.location.reload()
    });
  }
}

