import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import 'ember-power-select/styles';
import 'ember-pikaday/pikaday.css';

export default class EditEmployeeController extends Controller {
  @service employeeService;
  @service router;
  @service flashMessages;

  @tracked employee = {};
  @tracked index = null;
  @tracked selectedCountry = null;

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

    if (this.index !== null) {
      this.employeeService.employees[this.index] = { ...this.employee }; 
      this.flashMessages.info('Employee edited !');
    }
    this.router.transitionTo('employee-list'); 
  }
}
