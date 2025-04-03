import EmberRouter from '@ember/routing/router';
import config from 'employee/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('employee-list', { path: '/' });
  this.route('edit-employee', { path: '/edit-employee/:index' });
  this.route('add-employee');
});
