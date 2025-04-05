// app/controllers/application.js
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked isDarkMode = false;

  get Text() {
    return this.isDarkMode ? 'Light Mode' : 'Dark Mode';
  }

  @action
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }
}
