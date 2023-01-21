import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeData } from '../model/emlpoyee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 

  }

  postEmployee(data: EmployeeData) {
    return this.http.post<EmployeeData>("http://localhost:3000/employees/", data);
  }

  getEmployees(): Observable<EmployeeData> {
    return this.http.get<EmployeeData>("http://localhost:3000/employees");
  }

}
