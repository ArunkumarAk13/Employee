import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class EmployeeListController extends Controller {
  @service employeeService;
  @service flashMessages;

  @tracked searchQuery = '';

  @action
  search(event) {
    this.searchQuery = event.target.value.toLowerCase();
  }

  get filteredEmployees() {
    return this.employeeService.employees.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchQuery),
    );
  }
  @action
  clearSearch() {
    this.searchQuery = "";
  }

  @task({ drop: true }) 
  *deleteEmployee(index) {
    yield timeout(1000);
    this.employeeService.deleteEmployee(index);
    this.flashMessages.danger('Employee Deleted!');
  }

  @action
  deleteAllEmployees() {
    this.employeeService.employees = [];
    this.flashMessages.danger('All Employee Deleted');
  }

  @action
  deleteSelectedEmployees() {
    const selectedIndexes = [
      ...document.querySelectorAll('.employeeindex:checked'),
    ].map((checkbox) => parseInt(checkbox.value));

    if (selectedIndexes.length === 0) {
      this.flashMessages.warning('Atleast select one employee');
      return;
    }

    this.employeeService.deleteSelectedEmployees(selectedIndexes);
    this.flashMessages.danger('Selected employees deleted');
  }

  get employee() {
    return this.model.employee;
  }
}
