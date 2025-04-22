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
  @tracked showColumnSettings = false;
  @tracked sortColumn = 'name';
  @tracked isAscending = true;
  @tracked showSearchFilterSettings = false;
  @tracked searchColumns = {
    name: true,
    dob: true,
    country: true
};

  @tracked columns = [
    { label: 'Select', visible: true, key: 'select' },
    { label: 'Name', visible: true, key: 'name' },
    { label: 'DOB', visible: true, key: 'dob' },
    { label: 'Country', visible: true, key: 'country' },
    { label: 'Info', visible: true, key: 'info' },
    { label: 'Edit', visible: true, key: 'edit' },
    { label: 'Delete', visible: true, key: 'delete' }
    
  ];

  @action
  search(event) {
    this.searchQuery = event.target.value.toLowerCase();
    this.performSearch.perform(this.searchQuery);
  }

  @task({ keepLatest: true })
  *performSearch() {
    yield timeout(1000);
  }

  get isLoading() {
    return this.performSearch.isRunning || this.isSelectDeleting;
  }

  get filteredEmployees() {
    let query = this.searchQuery;
    let employees = this.employeeService.employees;
  
    if (query) {
      employees = employees.filter((emp) => {
        return (
          (this.searchColumns.name && emp.name.toLowerCase().includes(query)) ||
          (this.searchColumns.dob && emp.dob.toLowerCase().includes(query)) ||
          (this.searchColumns.country && emp.country.toLowerCase().includes(query))
        );
      });
    }
  
    return this.sortEmployees(employees);
  }

  @action
  toggleSearchFilterSettings() {
  this.showSearchFilterSettings = !this.showSearchFilterSettings;
}

  @action
  hideSearchFilters() {
  this.showSearchFilterSettings = false;
  }

  @action
  toggleSearchColumn(column) {
  this.searchColumns = {
    ...this.searchColumns,
    [column]: !this.searchColumns[column]
  };
  }

  sortEmployees(employees) {
    if (!this.sortColumn) return employees;

    return [...employees].sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];

      if (this.sortColumn === 'dob') {
        valA = new Date(valA);
        valB = new Date(valB);
      } else {
        valA = valA.toLowerCase?.() || valA;
        valB = valB.toLowerCase?.() || valB;
      }

      if (valA < valB) return this.isAscending ? -1 : 1;
      if (valA > valB) return this.isAscending ? 1 : -1;
      return 0;
    });
  }

  @action
  sortByColumn(column) {
    if (this.sortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortColumn = column;
      this.isAscending = true;
    }
  }

  @action
  getSortIcon(column) {
    if (this.sortColumn === column) {
      return this.isAscending ? 'fa-sort-up' : 'fa-sort-down';
    } else {
      return 'fa-sort';
    }
  }

  @action
  clearSearch() {
    this.searchQuery = '';
  }

  @action
  toggleColumnSettings() {
    this.showColumnSettings = !this.showColumnSettings;
  }
  @action
  toggleColumnSettingsFalse(){
      this.showColumnSettings=false;
  }

  @action
  toggleColumnVisibility(targetColumn) {
    this.columns = this.columns.map((column) =>
      column.key === targetColumn.key
        ? { ...column, visible: !column.visible }
        : column
    );
  }

  @action
  isColumnVisible(columnKey) {
    const column = this.columns.find(col => col.key === columnKey);
    return column ? column.visible : false;
  }

  @task({ enqueue: true })
  *deleteEmployee(index) {
    yield timeout(1000);
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
