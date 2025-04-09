import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import 'ember-power-select/styles';
import 'ember-pikaday/pikaday.css';

export default class EditEmployeeController extends Controller {
  @service employeeService;
  @service router;
  @service flashMessages;

  @tracked employee = {};
  @tracked selectedCountry = null;
  @tracked showSavingModal = false;

  set model(model) {
    if (model) {
      this.index = model.index;
      this.employee = { ...model.employee };
      this.selectedCountry = this.employee.country;
    }
  }

  get countries() {
    return this.employeeService.countries;
  }

  @action
  updateName(event) {
    this.employee.name = event.target.value;
  }

  @action
  updateDob(selectedDate) {
    this.employee.dob = selectedDate.toLocaleDateString('en-CA');
  }

  @action
  updateCountry(selectedCountry) {
    this.selectedCountry = selectedCountry;
    this.employee.country = selectedCountry;
  }

  @action
  saveEmployee(event) {
    event.preventDefault();
    this.showSavingModal = true;
    this.saveEmployeeTask.perform();
  }
  @action
  cancelSave() {
    this.saveEmployeeTask.cancelAll();
    this.showSavingModal = false;
  }

  @task({ drop: true })
  *saveEmployeeTask() {
    yield timeout(2000);
      this.employeeService.employees[this.index] = { ...this.employee };
      this.flashMessages.info('Employee edited!');

    this.showSavingModal = false;
    this.router.transitionTo('employee-list');
  }
}
