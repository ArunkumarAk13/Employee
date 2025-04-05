import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class EmployeeListController extends Controller {
  @service employeeService;
  @service flashMessages;

  @tracked showDeleteConfirm = false;
  @tracked searchQuery = '';

  @action
  search(event) {
    this.searchQuery = event.target.value.toLowerCase();
    this.performSearch.perform(this.searchQuery);
  }

  @task({ restartable: true })
  *performSearch() {
    yield timeout(1000);
  }

  get isLoading() {
    return this.performSearch.isRunning;
  }

  get filteredEmployees() {
    let query = this.searchQuery;

    if (!query) {
      return this.employeeService.employees;
    }

    return this.employeeService.employees.filter((emp) =>
      emp.name.toLowerCase().includes(query) ||
      emp.dob.toLowerCase().includes(query) ||
      emp.country.toLowerCase().includes(query)
    );
  }

  @action
  clearSearch() {
    this.searchQuery = '';
  }

  @task({ drop: true }) 
  *deleteEmployee(index) {
    yield timeout(1000);
    this.employeeService.deleteEmployee(index);
    this.flashMessages.danger('Employee Deleted!');
  }

  @action
  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  @action
  deleteAllEmployees() {
    this.employeeService.employees = [];
    this.showDeleteConfirm = false;
    this.flashMessages.danger('All Employee Deleted');
  }

  @action
  deleteSelectedEmployees() {
    const selectedIndexes = [
      ...document.querySelectorAll('.employeeindex:checked'),
    ].map((checkbox) => parseInt(checkbox.value));

    if (selectedIndexes.length === 0) {
      this.flashMessages.warning('At least select one employee');
      return;
    }

    this.employeeService.deleteSelectedEmployees(selectedIndexes);
    this.flashMessages.danger('Selected employees deleted');
  }
}
