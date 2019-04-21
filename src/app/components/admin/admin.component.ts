import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Employee} from '../../models/employee';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: ToastrService) { }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private allEmployees: Employee[];
  private submitted = false;
  private employeeForm = this.formBuilder.group({
    id: [''],
    username: ['', [Validators.required, Validators.pattern('[\\w-_]+')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    role: ['', Validators.required],
    name: ['', Validators.required]
  });

  private static parseForm(fg: FormGroup): Employee {
    return {
      id: fg.value.id,
      username: fg.value.username,
      phone: fg.value.phone,
      role: fg.value.role,
      name: fg.value.name,
    };
  }

  ngOnInit(): void  {
    this.getAllEmployees();
  }

  ngOnDestroy(): void  {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private get f() { return this.employeeForm.controls; }

  private setFormValues(emp: Employee): void  {
    this.employeeForm.setValue({
      id: emp.id,
      username: emp.username,
      phone: emp.phone,
      role: emp.role,
      name: emp.name
    });
  }

  private getAllEmployees(): void {
    this.apiService.getAllObjects<Employee[]>('employees').subscribe(
      res => this.allEmployees = res,
      error => this.toastr.error(error.error.message, 'Error'),
      () => {}
    );
    this.clearForm();
  }

  private addEmployee(): void  {
    if (this.employeeForm.invalid) {
      this.toastr.warning('Form invalid', 'Warning');
      return;
    }
    if (this.validatePhone(this.employeeForm.value.phone)) {
      this.toastr.warning('Phone number already in use', 'Warning');
      return;
    }
    const employee = new Employee(this.employeeForm.value);
    this.apiService.setNewObject<Employee>('employees', employee)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => this.toastr.success('New employee added!!!', 'Success'),
        error => this.toastr.error(error.error.message, 'Error'),
        () => {
          this.employeeForm.reset();
          this.getAllEmployees();
        }
      );
  }

  private updateEmployee(): void  {
    if (this.employeeForm.invalid) {
      this.toastr.warning('Form invalid', 'Warning');
      return;
    }
    if (this.allEmployees[this.employeeForm.value.id].phone !== this.employeeForm.value.phone && this.validatePhone(this.employeeForm.value.phone)) {
      this.toastr.warning('Phone number already in use', 'Warning');
      return;
    }
    const employee = AdminComponent.parseForm(this.employeeForm);
    this.apiService.updateObject<Employee>('employees', employee.id, employee as Employee).subscribe(
      res => this.toastr.success('Employee updated!!!', 'Success'),
      error => this.toastr.error(error.error.message, 'Error'),
      () => {
        this.employeeForm.reset();
        this.getAllEmployees();
      }
    );
  }

  private deleteEmployee(employee: Employee): void  {
    this.apiService.deleteObject<Employee>('employees', employee.id).subscribe(
      res => this.toastr.success('Employee deleted!!!', 'Success'),
    error => this.toastr.error(error.error.message, 'Error'),
    () => this.getAllEmployees()
    );
  }

  private validatePhone(phone: string): boolean {
    const phoneNrs = _.keys(_.pickBy(this.allEmployees, x => x.phone === phone.toString()));
    return phoneNrs.length > 0;
  }

  private clearForm() {
    this.employeeForm.setValue({
      id: '',
      username: '',
      phone: '',
      role: '',
      name: ''
    });
  }
}
