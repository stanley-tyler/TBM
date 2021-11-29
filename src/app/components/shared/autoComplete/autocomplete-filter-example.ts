import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSelectModule } from "@angular/material/select";
import { AdminComponent } from '../../admin/admin.component';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample implements OnInit, OnChanges {
  @Input()
  bikes!: Array<any>;
  @Input()
  admin!: AdminComponent;
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<string[]> | undefined;

  onSubmit(event: Event)
  {
    this.admin.bikes = this.bikes;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["bikes"].currentValue != undefined) {
      console.log(changes["bikes"].currentValue);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }
    
  }
  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
  }

  private _filter(value: string): string[] {
    var names : string[] = []; 
    const filterValue = value.toLowerCase();
    this.bikes = this.bikes.filter((option) => {
      if (option.name.toLowerCase().includes(filterValue)) {
        names.push(option.name);
        return option;
      }   
    })

    return names;
  }
}
