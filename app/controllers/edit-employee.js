import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EditEmployeeController extends Controller {
  @service employeeService;
  @service router;
  @service flashMessages;

  @tracked employee = {};
  @tracked index = null;

  set model(model) {
    if (model) {
      this.index = model.index; 
      this.employee = { ...model.employee };
    }
  }

  @action
  updateName(event) {
    this.employee.name = event.target.value;
  }

  @action
  updateDob(event) {
    this.employee.dob = event.target.value;
  }

  @action
  updateCountry(event) {
    this.employee.country = event.target.value;
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
