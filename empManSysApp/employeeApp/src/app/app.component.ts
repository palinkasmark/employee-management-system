import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EmployeeData } from './model/emlpoyee.model';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeeApp';

  employeeForm!: FormGroup;
  allEmployees: any;
  searchText: string = '';
  actionBtn: boolean = false;
  editedEmployeeId!: number;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService){}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      workExperience: ['', Validators.required],
    });
    this.getEmployees();
  }

  add() {
    this.actionBtn = true;
    this.employeeForm.reset();
  }

  addEmployee() {
    this.api.postEmployee(this.employeeForm.value).subscribe((res) => {
      this.employeeForm.reset();
      this.getEmployees();
    });
  }

  getEmployees() {
    this.api.getEmployees().subscribe((res) => {
      this.allEmployees = res;
    });
  }

  editEmployeeForm(employee: EmployeeData) {
    this.actionBtn = false;
    this.employeeForm.controls['name'].setValue(employee.name);
    this.employeeForm.controls['education'].setValue(employee.education);
    this.employeeForm.controls['company'].setValue(employee.company);
    this.employeeForm.controls['salary'].setValue(employee.salary);
    this.employeeForm.controls['birthDate'].setValue(employee.birthDate);
    this.employeeForm.controls['gender'].setValue(employee.gender);
    this.employeeForm.controls['workExperience'].setValue(employee.workExperience);
    this.editedEmployeeId = employee.id;
  }

  editEmployee() {
    this.api.putEmployee(this.employeeForm.value, this.editedEmployeeId)
    .subscribe((res) => {
      this.employeeForm.reset();
      this.getEmployees();
    });
  }

  deleteEmployee(employee: EmployeeData) {
    this.api.deleteEmployee(employee.id).subscribe((res) => {
      this.getEmployees();
    });
  }


}
