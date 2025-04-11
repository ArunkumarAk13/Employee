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
  @tracked isSelectDeleting = false;

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
    return this.performSearch.isRunning || this.isSelectDeleting;
  }

  get filteredEmployees() {
    let query = this.searchQuery;

    if (!query) {
      return this.employeeService.employees;
    }

    return this.employeeService.employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.dob.toLowerCase().includes(query) ||
        emp.country.toLowerCase().includes(query),
    );
  }

  @action
  clearSearch() {
    this.searchQuery = '';
  }

  @task({ drop: true })
  *deleteEmployee(index) {
    yield timeout(500);
    this.employeeService.deleteEmployee(index);
    this.flashMessages.danger('Employee Deleted!');
  }

  @action
  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  @task({ drop: true })
  *deleteAllEmployees() {
    yield timeout(1000);
    this.employeeService.employees = [];
    this.showDeleteConfirm = false;
    this.flashMessages.danger('All Employee Deleted');
  }

  @task({ drop: true })
  *deleteSelectedEmployees() {
    const selectedCheckboxes = [
      ...document.querySelectorAll('.employeeindex:checked'),
    ];
    const selectedIndexes = selectedCheckboxes.map((checkbox) =>
      parseInt(checkbox.value),
    );
    if (selectedIndexes.length === 0) {
      this.flashMessages.warning('At least select one employee');
      return;
    }
    this.isSelectDeleting = true;
    yield timeout(1000);
    this.employeeService.deleteSelectedEmployees(selectedIndexes);

    selectedCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    this.isSelectDeleting = false;
    this.flashMessages.danger('Selected employees deleted');
  }

  get isDeleting() {
    return this.deleteSelectedEmployees.isRunning;
  }
}
