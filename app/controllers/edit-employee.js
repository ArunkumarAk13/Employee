import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import 'ember-power-select/styles';
import 'ember-pikaday/pikaday.css';
import 'ember-power-calendar/styles';

export default class EditEmployeeController extends Controller {
  @service employeeService;
  @service router;
  @service flashMessages;

  @tracked employee = {};
  @tracked selectedCountry = null;
  @tracked showSavingModal = false;
  @tracked selectedSkills = [];
  @tracked selectedCollege = null;
  @tracked skillsPlaceholder = 'Select skills';
  @tracked collegePlaceholder = 'Select college';
  @tracked range = {
    start: null,
    end: null,
  };


  set model(model) {
    if (model) {
      this.index = model.index;
      this.employee = { ...model.employee };
      this.selectedCountry = this.employee.country;
      this.selectedGender = this.employee.gender || 'Choose your gender';
      this.selectedSkills = this.employee.skills || [];
      this.selectedCollege = this.employee.college;
    }
  }

  get countries() {
    return this.employeeService.countries;
  }

  get genders() {
    return ['Male', 'Female'];
  }

  get skills() {
    return ['JavaScript', 'Python', 'Java', 'C++', 'Ember.js', 'HTML', 'CSS', 'Reactjs','Solidity'];
  }

  get groupedColleges() {
    return [
      {
        groupName: 'Anna University',
        options: [
          { name: 'SNS College of Engineering' },
          { name: 'SNS College of Technology' }
        ]
      },
      {
        groupName: 'Stanford University',
        options: [
          { name: 'Government Engineering College' },
          { name: 'Government College of Technology' }
        ]
      },
      {
        groupName: 'MIT',
        options: [
          { name: 'Hindhustan College 0of Engineering' },
          { name: 'Kumaraguru Institute of Technology' }
        ]
      }
    ];
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
    if (this.range.start && this.range.end) {
      this.employee.academicYear = {
        from: this.range.start.toLocaleDateString('en-CA'),
        to: this.range.end.toLocaleDateString('en-CA')
      };
    }

    this.saveEmployeeTask.perform();
  }

  @action
  cancelSave() {
    this.saveEmployeeTask.cancelAll();
    this.showSavingModal = false;
  }

  @task({ restartable : true })
  *saveEmployeeTask() {
    yield timeout(2000);
    this.employeeService.employees[this.index] = { ...this.employee };
    this.flashMessages.info('Employee edited!');
    this.showSavingModal = false;
    this.router.transitionTo('employee-list');
  }

  @action
  updateGender(selectedGender) {
    this.selectedGender = selectedGender;
    this.employee.gender = selectedGender;
  }

  @action
  updateSkills(skills) {
    this.selectedSkills = skills;
    this.employee.skills = skills;
  }

  @action
  updateCollege(selected) {
    this.selectedCollege = selected;
    this.employee.college = selected;
  }

  @action
  onSelect(selected) {
  if (selected && selected.moment && selected.moment.start) {
    this.range = {
      start: selected.moment.start.toDate(),
      end: selected.moment.end ? selected.moment.end.toDate() : null,
    };
  }
}
}
