import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InfoEmployeeController extends Controller {
  @service router;

  @tracked employee;
  @tracked index;

  @action
  goToHomePage() {
      this.router.transitionTo('employee-list');
  }
}
