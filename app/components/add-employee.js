import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import 'ember-power-select/styles';
import 'ember-pikaday/pikaday.css';

export default class AddEmployeeComponent extends Component {
  @service employeeService;
  @service router;
  @service flashMessages;

  @tracked selectedCountry = 'Select Country';
  @tracked dob = null;

  get countries() {
    return this.employeeService.countries;
  }

  @action
  setDOB(date) {
    this.dob = date;
  }

  @action
  submitForm(event) {
    event.preventDefault();

    let name = event.target.name.value;
    let dob = this.dob.toLocaleDateString('en-CA');
    let country = this.selectedCountry;

    this.employeeService.addEmployee({ name, dob, country });
    this.router.transitionTo('employee-list');
    this.flashMessages.success('Employee added Successfully !');
  }
}
