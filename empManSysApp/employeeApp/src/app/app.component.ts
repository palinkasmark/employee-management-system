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

  addEmployee() {
    this.api.postEmployee(this.employeeForm.value).subscribe((res) => {
      this.employeeForm.reset();
    });
  }

  getEmployees() {
    this.api.getEmployees().subscribe((res) => {
      this.allEmployees = res;
    });
  }


}
