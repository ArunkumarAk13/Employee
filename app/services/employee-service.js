import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EmployeeService extends Service {



  @tracked employees = [
    { name: 'Sam', dob: '1990-05-15', country: 'India' },
    { name: 'Vijay', dob: '1992-07-20', country: 'India' },
    { name: 'Linga', dob: '1993-10-10', country: 'Japan' },
    { name: 'jaga', dob: '1990-05-18', country: 'Canada' },
    { name: 'brijesh', dob: '1992-09-25', country: 'Australia' },
    { name: 'delvin', dob: '2005-07-12', country: 'India' },
    { name: 'maha', dob: '1993-02-10', country: 'United Kingdom' },
    { name: 'abith', dob: '2004-03-15', country: 'India' }
  ];

  @tracked countries = [
    'India', 'USA', 'Canada', 'Germany', 'France','Australia', 'Japan', 'Brazil', 'United Kingdom', 'South Africa'];
    
  get filteredEmployees() {
    return this.employees;
  }

  deleteEmployee(index) {
    this.employees = this.employees.filter((_, i) => i !== index);

  }

  deleteSelectedEmployees(selectedIndexes) {
    this.employees = this.employees.filter(
      (_, i) => !selectedIndexes.includes(i),
    );
  }

  addEmployee(employee) {
    this.employees = [...this.employees, employee];
  }

  updateEmployee(index, updatedEmployee) {
    let updated = [...this.employees]; 
    updated[index] = { ...updatedEmployee }; 
    this.employees = updated; 
  }
}
