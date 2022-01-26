import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { Employee } from './modal/employee';
import { EmployeeServiceService } from './service/employee-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  public employees!: Employee[];
  public editEmployee?: Employee | undefined;
  display = "none";
  constructor(private _employeeService: EmployeeServiceService, config: NgbModalConfig, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getEmployee();
  }


openToggel(tglContent:any){
  this.modalService.open(tglContent);
}


  public getEmployee() {
    this._employeeService.getEmployee().subscribe((response: Employee[]) => {
      this.employees = response;
    },
      (err: HttpErrorResponse) => {
        alert(err.message);
      })
  }

  public onAddEmployee(addEmp: NgForm) {
    console.log("inside add form ", addEmp);
    this._employeeService.addEmployee(addEmp.value).subscribe(res => {
      this.getEmployee();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
      addEmp.reset();
    })
  }

  public onEditEmployee(editEmp: Employee) {
    this._employeeService.updateEmployee(editEmp).subscribe(res => {
      this.getEmployee();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    })
  }

  public onDeleteEmployee(deleteId:number) {
    this._employeeService.deleteEmployee(deleteId).subscribe(res => {
        this.getEmployee();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    })
  }



  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployee();
    }
  }

  deleteEmployee:Employee | undefined;

  open(content: any, tempVar: any, employee?: Employee) {
    debugger;
    if (tempVar == "edit") {
      this.editEmployee = employee;
      this.modalService.open(content);
    } else if (tempVar == "add") {
      this.modalService.open(content);
    } else if (tempVar == "delete") {
      this.modalService.open(content);
      this.deleteEmployee=employee;
    }
  }




}
function empId(empId: any) {
  throw new Error('Function not implemented.');
}

