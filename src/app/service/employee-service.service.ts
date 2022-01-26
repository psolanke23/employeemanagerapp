import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from '../modal/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private apiServalUrl=environment.apiServalUrl;
  constructor(private http: HttpClient) { }
 
  public getEmployee():Observable<Employee[]>{
  return this.http.get<Employee[]>(`${this.apiServalUrl}/employee/all`);
  }

  public addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServalUrl}/employee/add`,employee);
  }
 
  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServalUrl}/employee/update`,employee);
  }

  public deleteEmployee(employeeId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServalUrl}/employee/delete/${employeeId}`);
  }


}
