import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EmployeeService extends Service {



  @tracked employees = [
    { name: 'Sam', dob: '1990-05-15', country: 'India' },
    { name: 'Vijay', dob: '1992-07-20', country: 'India' },
    { name: 'Arul', dob: '1995-08-25', country: 'India' },
    { name: 'Linga', dob: '1993-10-10', country: 'Japan' },
  ];

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
    this.employees[index] = { ...updatedEmployee };
    
  }
}
