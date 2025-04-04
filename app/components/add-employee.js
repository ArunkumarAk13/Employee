import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import 'ember-power-select/styles';


export default class AddEmployeeComponent extends Component {
  @service employeeService;
  @service router;
  @service flashMessages;

  countries = ['India','USA', 'Canada',  'Germany', 'France', 'Australia', 'Japan', 'Brazil', 'United Kingdom', 'South Africa'
  ];
  @tracked selectedCountry = null;
  @tracked dob = null;

  @action
  setDOB([selectedDate]) {
    this.dob = selectedDate;
  }

  @action
  submitForm(event) {
    event.preventDefault();

    let name = event.target.name.value;
    let dob = this.dob?.toISOString().split('T')[0]
    let country = this.selectedCountry;

    this.employeeService.addEmployee({ name, dob, country });
    this.router.transitionTo('employee-list');
    this.flashMessages.success('Employee added Successfully !');
  }
}
